<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Rules\Phone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Stripe;

class OrderController extends Controller
{

    public function index(Request $request) {

        $checkoutSessionId = Session::get('sessionCheckoutId', '');

        if($checkoutSessionId) {
            $newOrder = Order::where('session_checkout_id', $checkoutSessionId)->where('status', 'unfinished')->first();

            if($newOrder) {
                $newOrder->status = "food processing";
                $newOrder->save();
            }
        }

        $orders = $request->user()->orders ?? [];
        $ordersToSent = [];
        
        foreach ($orders as $order) {
            $orderToSent = [
                'id' => $order->id,
                'description' => '',
                'montant' => $order->montant,
                'numberOfItems' => $order->numberOfItems,
                'status' => $order->status
            ];

            $orderTOsentDescriptions = [];

            foreach ($order->dishes as $dish) {
                $orderTOsentDescriptions[] .= $dish->name . " x " . (string) $dish->pivot->quantity;
            }

            $orderToSent['description'] = implode(', ', $orderTOsentDescriptions);

            $ordersToSent[] = $orderToSent;
        }

        return $ordersToSent;
    }

    public function store(Request $request)
    {

        Stripe::setApiKey(config('stripe.sk'));

        $data = $request->validate([
            'firstName' => 'required|max:255',
            'lastName' => 'required|max:255',
            'email' => 'required|email',
            'street' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zipCode' => 'required',
            'country' => 'required',
            'phone' => ['required', new Phone],
        ]);

        $cart = $request->user()->cart;

        $extraData = [
            'user_id' => $request->user()->id,
            'montant' => $cart->first()->dishes->map(fn($dish) => $dish->pivot->total)->sum() + 39,
            'numberOfItems' => $cart->first()->dishes->count(),
            'status' => 'unfinished',
            'session_checkout_id' => Session::get('sessionCheckoutId'),
        ];

        $order = Order::create([...$data, ...$extraData]);

        $cart->dishes->each(function($dish) use ($order) {
            $order->dishes()->attach($dish->id, [
                'quantity' => $dish->pivot->quantity,
                'total' => $dish->pivot->total
            ]);
        });

        $cart->delete();

        return response()->json([
            'status' => 'Order created successfully',
        ], 200);

    }

    public function checkout(Request $request)
    {

        $cart = $request->user()->cart;
        $cartItems = $cart->dishes;
        
        $cartItems = $cartItems->map(function($item) {
            return [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $item->name,
                    ],
                    'unit_amount' => $item->price * 100,
                ],
                'quantity' => $item->pivot->quantity,
            ];
        });

        Stripe::setApiKey(config('stripe.sk'));
        
        $session = StripeSession::create([
            'mode' => 'payment',
            'line_items' => $cartItems->toArray(),
            'success_url' => env('FRONTEND_URL').'/orders?checkout_session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => env('FRONTEND_URL').'/cart',
        ]);

        Session::put('sessionCheckoutId', $session->id);

        return response()->json([
            'url' => $session->url,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMail;
use App\Mail\ServiceEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function contact (ContactRequest $request) {
        Mail::to("pearcexe@gmail.com")->send(
            new ContactMail(
                $request->validated("first_name"),
                $request->validated("last_name"),
                $request->validated("email"),
                $request->validated("topic"),
                $request->validated("message"),
            )
        );
    }
}

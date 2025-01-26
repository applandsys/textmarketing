<?php

namespace App\Http\Controllers;

use App\Models\PhoneNumber;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ListController extends Controller
{
   public function index(Request $request): Response
   {
       $list = PhoneNumber::get();
       return Inertia::render('NumberList', [
           'list' => $list,
       ]);
   }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt|max:20048',
        ]);

        $file = $request->file('file');

        // Open and read the CSV file
        $handle = fopen($file, 'r');
        $header = true;

        while (($row = fgetcsv($handle, 1000, ',')) !== false) {
            // Skip header row
            if ($header) {
                $header = false;
                continue;
            }

            // Insert phone number into the database
            PhoneNumber::create([
                'group_id' => 1,
                'country' => 'Bangladesh',
                'name' => $row[0],
                'location' => $row[1],
                'number' => $row[2],
                'status' => 'active',
            ]);
        }

        fclose($handle);

        return back()->with('success', 'CSV file uploaded and phone numbers saved successfully!');
    }
}

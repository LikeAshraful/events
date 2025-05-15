import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import React from "react";
import { format } from "date-fns"




export const Search = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <section
      id="search"
      className="container pt-24 sm:py-20 mx-auto">

      <div>
        <Card className="w-full mx-auto shadow-lg border">
          <CardHeader>
            <CardTitle className="text-xl">Discover Events Near You</CardTitle>
            <p className="text-muted-foreground">
              Explore top events happening in your area and beyond.
            </p>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            {/* Location Input */}
            <div className="w-full mr-4">
              <Label htmlFor="location" className="mb-2 block bold text-2xl">
                Location
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <MapPinIcon />
                </span>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter location"
                  className="pl-10 w-full h-15"
                />
              </div>
            </div>

            {/* Date Picker */}
            <div className="w-full">
              <Label className="mb-2 block  bold text-2xl">From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full text-left pl-10 pr-3 py-3 border rounded-md bg-white dark:bg-black text-sm focus:outline-none h-15 relative"
                  >
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <CalendarIcon />
                    </span>
                    {date ? format(date, "PPP") : <span className="text-gray-500">Pick a date</span>}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      </div>

    </section>
  );
};

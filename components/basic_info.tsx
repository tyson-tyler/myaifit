"use client";

// imports
import { useState, useContext, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { StepsContext } from "@/context/steps";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { BiSolidDownArrow } from "react-icons/bi";
import CardComponent from "./card";
import { Button } from "./ui/button";
import Picker from "./picker";

export default function BasicInfoCard({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: string;
}) {
  // variables
  const { getAnswer, updateAnswer, blockNext, allowNext } =
    useContext(StepsContext);
  const [answers, setAnswers] = useState<any>(getAnswer(id));
  const [is_accurate, setIsAccurate] = useState<boolean>(
    answers.is_fat_accurate === "yes"
  );
  const [is_choose, setIsChoose] = useState<boolean>(answers.is_fat_accurate);

  // functions
  useEffect(() => {
    updateAnswer(id, answers);
    if (answers.is_fat_accurate !== null) allowNext();
    else blockNext();
  }, [answers]);

  // returns
  return (
    <CardComponent title={title} description={description}>
      <div className="grid w-full items-center gap-10 lg:gap-16">
        {/* Name */}
        {/* <div className="flex flex-col space-y-3">
          <Label htmlFor="name" className="text-md lg:text-lg">
            Email Address{" "}
            <span className="text-neutral-500 text-xs lg:text-md">
              (optional)
            </span>
          </Label>
          <Input
            defaultValue={answers.name}
            onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
            id="name"
            placeholder="info@trainer.com"
            className="py-6 lg:py-7 text-md lg:text-xl"
          />
        </div> */}

        {/* Age */}
        <div className="flex flex-col space-y-3">
          <Label htmlFor="age" className="text-md lg:text-lg">
            Your Age?
          </Label>
          <Picker
            max={99}
            min={16}
            tag="years"
            value={answers.age}
            onAdd={() => setAnswers({ ...answers, age: answers.age + 1 })}
            onRemove={() => setAnswers({ ...answers, age: answers.age - 1 })}
            onSlide={(e) => setAnswers({ ...answers, age: e })}
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col w-full space-y-3">
          <Label htmlFor="gender" className="text-md lg:text-lg">
            Gender
          </Label>
          <RadioGroup
            defaultValue={answers.gender}
            onValueChange={(e) => setAnswers({ ...answers, gender: e })}
            className="flex gap-4 w-full"
          >
            {/* Male */}
            <div className="w-full">
              <RadioGroupItem value="M" id="M" className="peer sr-only" />
              <Label
                htmlFor="M"
                className="flex relative h-full text-center text-xl lg:text-2xl gap-2 flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-secondary [&:has([data-state=checked])]:border-primary"
              >
                <span className="text-2xl lg:text-3xl">🧑</span>
                Male
              </Label>
            </div>

            {/* Female */}
            <div className="w-full">
              <RadioGroupItem value="F" id="female" className="peer sr-only" />
              <Label
                htmlFor="female"
                className="flex h-full text-center text-xl lg:text-2xl gap-2 flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="text-2xl lg:text-3xl">👩</span>
                Female
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Height and Weight */}
        <div className="flex flex-col lg:flex-row w-full gap-4 h-full">
          <div className="flex flex-col space-y-2 w-full h-full">
            <Label htmlFor="age" className="text-md lg:text-lg">
              Height 📏
            </Label>
            <Picker
              max={270}
              min={120}
              tag="cm"
              value={answers.height}
              onAdd={() => {
                setAnswers({ ...answers, height: answers.height + 1 });
              }}
              onRemove={() => {
                setAnswers({ ...answers, height: answers.height - 1 });
              }}
              onSlide={(e) => setAnswers({ ...answers, height: e })}
            />
          </div>

          <Separator orientation="vertical" className="hidden lg:block" />

          <div className="flex flex-col space-y-2 w-full h-full">
            <Label htmlFor="age" className="text-md lg:text-lg">
              Weight ⚖️
            </Label>
            <Picker
              max={160}
              min={30}
              tag="Kg"
              value={answers.weight}
              onAdd={() => {
                setAnswers({ ...answers, weight: answers.weight + 1 });
              }}
              onRemove={() => {
                setAnswers({ ...answers, weight: answers.weight - 1 });
              }}
              onSlide={(e) => setAnswers({ ...answers, weight: e })}
            />
          </div>
        </div>

        {/* Measure question */}
        <div className="flex flex-col w-full gap-3">
          <Label htmlFor="name" className="text-md lg:text-lg">
            Do you have a measuring tape?
          </Label>
          <RadioGroup
            defaultValue={answers.is_fat_accurate}
            onValueChange={(e) => {
              setAnswers({ ...answers, is_fat_accurate: e });
              setIsChoose(true);
              setIsAccurate(e === "yes");
            }}
            className="flex gap-6 items-center"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="text-md">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="text-md">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Body composition - Approximate */}
        {is_choose && !is_accurate && (
          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="gender" className="text-md lg:text-lg">
              What is your current body fat percentage?
            </Label>

            <RadioGroup
              onValueChange={(e) => setAnswers({ ...answers, body_type: e })}
              defaultValue={answers.body_type}
              className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full"
            >
              {/* Ultra-Lean */}
              <div className="w-full col-span-1 h-full">
                <RadioGroupItem
                  value="ultralean"
                  id="ultralean"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="ultralean"
                  className="flex h-full text-center text-lg lg:text-2xl gap-2 flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="text-3xl">💪🏋️‍♂️🔥</span>
                  Extremely Lean
                  <span className="text-neutral-400 text-sm text-center font-normal">
                    1% - 5% body fat
                  </span>
                </Label>
              </div>

              {/* very Lean */}
              <div className="w-full col-span-1 h-full">
                <RadioGroupItem
                  value="verylean"
                  id="verylean"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="verylean"
                  className="flex h-full text-center text-lg lg:text-2xl gap-2 flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="text-3xl">🏃‍♂️🥇</span>
                  Very Lean
                  <span className="text-neutral-400 text-sm text-center font-normal">
                    6% - 12% body fat
                  </span>
                </Label>
              </div>

              {/* Athletic */}
              <div className="w-full col-span-1 h-full">
                <RadioGroupItem
                  value="athletic"
                  id="athletic"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="athletic"
                  className="flex h-full text-center text-lg lg:text-2xl gap-2 flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="text-3xl">💪🏅</span>
                  Athletic
                  <span className="text-neutral-400 text-sm text-center font-normal">
                    13% - 18% body fat
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Choose if accurate or not */}
        {is_choose && is_accurate && (
          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="gender" className="text-md lg:text-lg">
              You selected you have an accurate measurement. Would you like to
              change it?
            </Label>
            <div className="flex gap-6">
              <Button
                className="flex gap-2 px-4 text-neutral-500"
                onClick={() =>
                  setAnswers({ ...answers, is_fat_accurate: "no" })
                }
              >
                <IoIosRemove />
                Change to inaccurate
              </Button>
              <Button
                className="flex gap-2 px-4 text-neutral-500"
                onClick={() =>
                  setAnswers({ ...answers, is_fat_accurate: "yes" })
                }
              >
                <IoIosAdd />
                Keep accurate
              </Button>
            </div>
          </div>
        )}
      </div>
    </CardComponent>
  );
}

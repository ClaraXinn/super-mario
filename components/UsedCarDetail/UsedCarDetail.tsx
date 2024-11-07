"use client";

import React, { useState } from "react";
import Image from "next/image";
import car1 from "@/public/images/car1.jpeg";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { UsedCarListing } from "@prisma/client";
import { CldImage } from "next-cloudinary";

interface UsedCarDetailProps {
  car: UsedCarListing;
}

const UsedCarDetail = ({ car }: UsedCarDetailProps) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="flex flex-wrap gap-8 py-10 px-5 w-full justify-center bg-gray-100 container">
      <div className="relative overflow-hidden">
        <CldImage
          src={car.imgUrl}
          alt="Preview"
          width={1000}
          height={1000}
          className="object-cover shadow-lg rounded-lg"
          style={{ width: "350px", height: "250px" }}
        />

        <div
          onClick={toggleLike}
          className="absolute top-3 right-3 cursor-pointer text-red-500"
        >
          {liked ? (
            <FaHeart size={24} className="transition-all duration-200" />
          ) : (
            <FaRegHeart size={24} className="transition-all duration-200" />
          )}
        </div>
      </div>
      <div className="max-w-lg min-w-96 space-y-4 p-5 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between">
          <h1 className="font-extrabold text-3xl text-gray-800">{car.title}</h1>
          <h2 className="text-gray-600 font-bold">{car.viewCount} views</h2>
        </div>
        <h2 className="font-bold text-xl text-green-500">${car.price}</h2>
        <Link href={`/product/user_review/${car.agentEmail}`}>
          <p className="text-primary">{car.agentEmail}</p>
        </Link>
        <p className="text-gray-600 leading-relaxed">{car.description}</p>
        <div>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <span className="font-semibold">Color:</span> {car.color}
            </li>
            <li>
              <span className="font-semibold">Condition:</span> {car.condition}
            </li>
            <li>
              <span className="font-semibold">Mileage:</span> {car.mileage}
            </li>
            <li>
              <span className="font-semibold">Manufactured Year:</span>{" "}
              {car.manufacturedYear}
            </li>
          </ul>
        </div>
        <br />
        <Button>Calculate Loan</Button>
      </div>
    </div>
  );
};

export default UsedCarDetail;
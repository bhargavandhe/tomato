import React, { useEffect } from "react";
import { db } from "../firebase";
import { firestore } from "firebase";
function AddData() {
  const hotels = {
    kfc: {
      name: "Kentucky Fried Chicken",
      location: "Solapur",
      rating: 4.5,
      media:
        "https://images.unsplash.com/photo-1620174645265-05820da4ff20?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80",
      categories: {
        snacks: [
          {
            type: "non-veg",
            title: "Classic Chicken Zinger",
            price: 249,
            media:
              "https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
            available: true,
            deliveryTime: 25,
          },
        ],
      },
    },
  };

  function populateFoodBase() {
    Object.keys(hotels).forEach((hotelID) => {
      let hotel = hotels[hotelID];

      // hotel basic info
      db.collection("restaurants").doc(hotelID).set({
        displayName: hotel.name,
        rating: hotel.rating,
        location: hotel.location,
        media: hotel.media,
        categories: [],
      });

      // hotel categories
      Object.keys(hotel.categories).forEach((category) => {
        // adding category to hotel basic info
        db.collection("restaurants")
          .doc(hotelID)
          .update({
            categories: firestore.FieldValue.arrayUnion(category),
          });

        // adding foods to categories
        hotel.categories[category].forEach((post) => {
          db.collection("restaurants")
            .doc(hotelID)
            .collection(category)
            .add(post)
            .then((doc) => {
              db.collection("restaurants")
                .doc(hotelID)
                .collection(category)
                .doc(doc.id)
                .set({ ...post, ref: doc.path, category: category })
                .then(() => {
                  // adding category to categories
                  db.collection("categories")
                    .doc(category)
                    .set(
                      { foods: firestore.FieldValue.arrayUnion(doc.path) },
                      { merge: true }
                    );
                  console.log("Added");
                });
            });
        });
      });
    });
  }

  useEffect(() => {
    populateFoodBase();
  }, []);
  return <div>Adding Data</div>;
}

export default AddData;

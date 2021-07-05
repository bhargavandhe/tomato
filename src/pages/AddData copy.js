import React, { useEffect } from "react";
import { db } from "../firebase";
function AddData() {
  const hotels = [
    {
      id: "dominos",
      displayName: "Domino's",
      location: "",
      ratings: 5,
      brandLogo: "",
    },
    {
      id: "kfc",
      displayName: "KFC - Kentucky Friend Chicken",
      location: "",
      ratings: 5,
      brandLogo: "",
    },
    {
      id: "subway",
      displayName: "Subway",
      location: "",
      ratings: 5,
      brandLogo: "",
    },
    {
      id: "pizzaHut",
      displayName: "PizzaHut",
      location: "",
      ratings: 5,
      brandLogo: "",
    },
  ];
  const foodBase = [
    {
      name: "dominos",
      categories: {
        mainCourse: [
          {
            type: "veg",
            title: "Veg Paneer",
            price: 120,
            media:
              "https://images.unsplash.com/photo-1534991187874-6262aa32d3cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1038&q=80",
            available: true,
            deliveryTime: 20,
          },
          {
            type: "veg",
            title: "Veg Pulav",
            price: 220,
            media:
              "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
            available: true,
            deliveryTime: 20,
          },
          {
            type: "veg",
            title: "Malai Kofta",
            price: 120,
            media:
              "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1224&q=80",
            available: false,
            deliveryTime: 20,
          },
        ],
        snacks: [
          {
            type: "veg",
            title: "Cheese burst pizza",
            price: 230,
            media:
              "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1045&q=80",
            available: true,
            deliveryTime: 20,
          },
          {
            type: "veg",
            title: "Jumbo Burger",
            price: 180,
            media:
              "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80",
            available: true,
            deliveryTime: 20,
          },
          {
            type: "veg",
            title: "French fries",
            price: 150,
            media:
              "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            available: true,
            deliveryTime: 20,
          },
        ],
      },
    },
    {
      name: "kfc",
      categories: {
        snacks: [
          {
            type: "non-veg",
            title: "Kentucky Fried Chicken",
            price: 290,
            media:
              "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            available: true,
            deliveryTime: 10,
          },
          {
            type: "non-veg",
            title: "Crispy Chicken burger",
            price: 250,
            media:
              "https://images.unsplash.com/photo-1572448862527-d3c904757de6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            available: false,
            deliveryTime: 15,
          },
        ],
      },
    },
  ];

  // dominos: {
  //   name: "Domino's Pizza",
  //   location: "Solapur",
  //   rating: "4.5",
  //   media:
  //     "https://images.unsplash.com/photo-1620174645265-05820da4ff20?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80",
  //   categories: {
  //     mainCourse: [
  //       {
  //         type: "veg",
  //         title: "Veg Paneer",
  //         price: 120,
  //         media:
  //           "https://images.unsplash.com/photo-1534991187874-6262aa32d3cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1038&q=80",
  //         available: true,
  //         deliveryTime: 20,
  //       },
  //       {
  //         type: "veg",
  //         title: "Veg Pulav",
  //         price: 220,
  //         media:
  //           "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
  //         available: true,
  //         deliveryTime: 20,
  //       },
  //       {
  //         type: "veg",
  //         title: "Malai Kofta",
  //         price: 120,
  //         media:
  //           "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1224&q=80",
  //         available: false,
  //         deliveryTime: 20,
  //       },
  //     ],
  //     snacks: [
  //       {
  //         type: "veg",
  //         title: "Cheese burst pizza",
  //         price: 230,
  //         media:
  //           "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1045&q=80",
  //         available: true,
  //         deliveryTime: 20,
  //       },
  //       {
  //         type: "veg",
  //         title: "Jumbo Burger",
  //         price: 180,
  //         media:
  //           "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80",
  //         available: true,
  //         deliveryTime: 20,
  //       },
  //       {
  //         type: "veg",
  //         title: "French fries",
  //         price: 150,
  //         media:
  //           "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //         available: true,
  //         deliveryTime: 20,
  //       },
  //     ],
  //   },
  // },
  // kfc: {
  //   name: "Kentucky Fried Chicken",
  //   location: "Solapur",
  //   rating: "4.5",
  //   media:
  //     "https://images.unsplash.com/photo-1620174645265-05820da4ff20?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80",
  //   categories: {
  //     snacks: [
  //       {
  //         type: "non-veg",
  //         title: "Kentucky Fried Chicken",
  //         price: 290,
  //         media:
  //           "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //         available: true,
  //         deliveryTime: 10,
  //       },
  //       {
  //         type: "non-veg",
  //         title: "Crispy Chicken burger",
  //         price: 250,
  //         media:
  //           "https://images.unsplash.com/photo-1572448862527-d3c904757de6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //         available: false,
  //         deliveryTime: 15,
  //       },
  //     ],
  //   },
  // },

  function populateFoodBase() {
    foodBase.forEach((hotel) => {
      Object.keys(hotel.categories).forEach((category) => {
        hotel.categories[category].forEach((post) => {
          db.collection("restaurants")
            .doc(hotel.name)
            .collection(category)
            .add(post)
            .then((doc) => {
              console.log(doc.path);
              db.collection("restaurants")
                .doc(hotel.name)
                .collection(category)
                .doc(doc.id)
                .set({ ...post, ref: doc.path })
                .then(console.log("Added"));
            });
        });
      });
    });
  }

    function populateHotels() {
      hotels.forEach((element) => {
        console.log(element);
        db.collection("restaurants")
          .doc(element.id)
          .set({
            id: element.id,
            displayName: element.displayName,
            brandLogo: element.brandLogo,
            location: element.location,
            ratings: element.ratings,
          })
          .then(console.log("Done"));
      });
    }

  useEffect(() => {
    populateFoodBase();
  }, []);
  return <div>Adding Data</div>;
}

export default AddData;

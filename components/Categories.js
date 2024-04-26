import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";

import CategoryCard from "./CategoryCard";

import sanityClient,  { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == 'category']`
      )
      .then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          title={category.name}
          imageUrl={urlFor(category.image).url()}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;

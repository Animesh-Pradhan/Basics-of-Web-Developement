import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import './App.css'
import MyProductPage1 from "./MyProductPage1";
import { useState } from "react";
import MyProductPage2 from "./MyProductPage2";

const Posts = [
  { id: 1, title: "Post - 1" },
  { id: 2, title: "Post - 2" },
  { id: 3, title: "Post - 3" }
]

//posts => ["posts"]
//psots/1 => ["posts", post.id]
//posts?authorId=1 => ["posts", {authorId: 1}]
//posts/2/comments => ["posts", post.id, "comments"]



function App() {
  // const queryClient = useQueryClient();
  // const reactQuery = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: () => wait(1000).then(() => [...Posts]),
  // })


  // const newPostMutation = useMutation({
  //   mutationFn: (title) => {
  //     return wait(1000)?.then(() => Posts.push({id: crypto.randomUUID(), title}))
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("posts")
  //   }
  // })

  // if (reactQuery.isLoading) return <h1>Loading...</h1>
  // if(reactQuery.error) return <h1>Error while fetching</h1>

  const [currentPage, setCurrentpage] = useState(null);


  const getProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products`);
    const data = await response.json()
    return data?.products;
  }

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const getProductById = async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json()
    return data;
  }
  

  const productByIdQuery = useQuery({
    queryKey: ["product", currentPage],
    enabled: currentPage != null,
    queryFn: () => getProductById(currentPage)
  })

  if (productsQuery.status === "error") {
    return <h1>{JSON.stringify(productsQuery.error)}</h1>
  }
  if (productsQuery.isFetching) return <h1>Loading...</h1>;

  if (productByIdQuery.status === "error") {
    return <h1>{JSON.stringify(productByIdQuery.error)}</h1>
  }

  return (
    // <div>
    //   <h1>Hello </h1>
    //   <button disabled={newPostMutation.isPending} onClick={() => newPostMutation.mutate("New Post")}>Add new Post</button>
    //   {reactQuery.data?.map((item) => <p key={item?.id}>{item?.title}</p>)}
    // </div>


    <div>
      <div>

        {productsQuery?.data?.map(item => <button key={item.id} onClick={() => setCurrentpage(item.id)}>Product - {item.id}</button>)}
        <br />
        <br />
        <hr />
        <br />

        {currentPage && (productByIdQuery.isFetching ? <h1>Loading...</h1> : <MyProductPage1 data={productByIdQuery?.data} />)}
      </div>
    </div>
  )
}


const wait = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App

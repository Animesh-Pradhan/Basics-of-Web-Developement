import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import './App.css'

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
  const queryClient = useQueryClient();
  const reactQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...Posts]),
  })


  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000)?.then(() => Posts.push({id: crypto.randomUUID(), title}))
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts")
    }
  })

  if (reactQuery.isLoading) return <h1>Loading...</h1>
  if(reactQuery.error) return <h1>Error while fetching</h1>

  return (
    <div>
      <h1>Hello </h1>
      <button disabled={newPostMutation.isPending} onClick={() => newPostMutation.mutate("New Post")}>Add new Post</button>
      {reactQuery.data?.map((item) => <p key={item?.id}>{item?.title}</p>)}
    </div>
  )
}


const wait = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App

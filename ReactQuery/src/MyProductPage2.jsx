import { useQuery } from "@tanstack/react-query";

export default function MyProductPage2() {
    const getProducts = async () => {
        const response = await fetch('https://dummyjson.com/products/2');
        const data = await response.json();
        return data;
    };

    const productsQuery = useQuery({
        queryKey: ["product"],
        queryFn: getProducts
    });

    if (productsQuery.status === "error") {
        return <h1>{JSON.stringify(productsQuery.error)}</h1>
    }
    if (productsQuery.isFetching) return <h1>Loading...</h1>;

    return (
        <div>
            <h1>Product 2 - {productsQuery?.data?.title}</h1>
            <ul>
                {productsQuery?.data?.reviews?.map(item => (
                    <li key={item.id}>
                        {`${item.rating} stars - ${item?.comment}`}
                    </li>
                ))}
            </ul>
        </div>
    );
}

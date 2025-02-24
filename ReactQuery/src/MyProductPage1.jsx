export default function MyProductPage1({ data }) {  

    console.log(data);
    
    return (
        <div>
            <h1>Product {data.id} - {data?.title}</h1>
            <ul>
                {data?.reviews?.map((item, _) => <li key={_}>
                    {`${item.rating} stars - ${item?.comment}`}
                </li>)}
            </ul>
        </div>
    )
}



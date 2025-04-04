type Props = {
    params: {
        product: string
    }
}

export const dynamic = 'force-dynamic';

export default async function ProductPage({params}: Props) {
    const product = params.product;

    return (
        <h1>{product}</h1>
    )
}
import NextTopLoader from 'nextjs-toploader';

type LoaderProps = {
    color: string
}

export default function TopLoader({color}: LoaderProps) {
    return (
        <NextTopLoader
            color={color}
            height={3}
            showSpinner={false}
            showAtBottom={false}
            speed={400}
            crawlSpeed={200}
            easing="ease"
            zIndex={9999}
        />
    )
}
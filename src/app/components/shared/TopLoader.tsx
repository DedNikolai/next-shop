import NextTopLoader from 'nextjs-toploader';

export default function TopLoader() {
    return (
        <NextTopLoader
            color="#f1a10d"
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
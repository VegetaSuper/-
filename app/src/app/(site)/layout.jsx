import LayoutHeader from './_components/layout-header'
export const metadata = {
    title: '小红书 - 你的生活指南',
    description: '2 亿人的生活经验，都在小红书'
}
export default function Layout({ children }) {
    return (
        <div className="layout">
            <LayoutHeader />
            <div className="">
                <aside></aside>
                <main>{children}</main>
            </div>
        </div>
    )
}


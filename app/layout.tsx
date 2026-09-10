import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'SocialOps · 社会化运营工作台',description:'品牌知识、竞品动态与内容创作的一体化工作空间。',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="zh-CN"><body>{children}</body></html>}

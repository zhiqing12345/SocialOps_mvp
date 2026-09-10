'use client';

import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { type Page } from './model';

export function IndustryCases({ navigate }: { navigate: (page: Page) => void }) {
  return <>
    <div className="page-heading interior-heading"><div><h1>行业优秀案例</h1><p>沉淀值得借鉴的行业内容与传播案例。</p></div></div>
    <section className="panel">
      <Empty className="blank-state">
        <EmptyHeader><EmptyMedia><BookOpen size={29}/></EmptyMedia><EmptyTitle>暂无行业优秀案例</EmptyTitle><EmptyDescription>案例库尚未录入内容，可先到竞品调研查看内容动态，寻找值得借鉴的案例。</EmptyDescription></EmptyHeader>
        <Button variant="outline" onClick={() => navigate('insights')}>查看竞品调研<ArrowRight size={16}/></Button>
      </Empty>
    </section>
  </>;
}

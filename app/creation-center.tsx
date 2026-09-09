'use client';

import { useState, type ComponentProps } from 'react';
import { BookOpen, Check, Clapperboard, FileText, Image, LayoutTemplate, PenLine, Ratio, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Creator, notify } from './workspace';

export type CreationMode = 'poster' | 'video' | 'copy';
type Props = ComponentProps<typeof Creator> & { mode: CreationMode; onModeChange: (mode: CreationMode) => void };
const modes = [{ id: 'poster', label: '海报创作' }, { id: 'video', label: '视频混剪' }, { id: 'copy', label: '文案生成' }] as const;

export function CreationCenter({ mode, onModeChange, ...props }: Props) {
 return <Tabs value={mode} onValueChange={v => onModeChange(v as CreationMode)} className="creation-center section-tabs">
  <TabsList variant="line" className="section-tabs-nav" aria-label="内容创作类型">
   {modes.map(item => <TabsTrigger key={item.id} value={item.id}>{item.label}</TabsTrigger>)}
  </TabsList>
  <TabsContent value="poster" keepMounted><MediaWorkspace kind="poster" brand={props.model.brand.name} knowledgeCount={props.model.knowledge.length}/></TabsContent>
  <TabsContent value="video" keepMounted><MediaWorkspace kind="video" brand={props.model.brand.name} knowledgeCount={props.model.knowledge.length}/></TabsContent>
  <TabsContent value="copy" keepMounted><Creator {...props}/></TabsContent>
 </Tabs>;
}

type Brief = { title: string; purpose: string; ratio: string; requirements: string };
function MediaWorkspace({ kind, brand, knowledgeCount }: { kind: 'poster' | 'video'; brand: string; knowledgeCount: number }) {
 const isPoster = kind === 'poster';
 const [brief, setBrief] = useState<Brief>({ title: '', purpose: isPoster ? '品牌宣传' : '产品展示', ratio: isPoster ? '竖版 3:4' : '竖屏 9:16', requirements: '' });
 const [saved, setSaved] = useState<Brief | null>(null);
 const options = isPoster ? ['品牌宣传', '产品介绍', '活动预告'] : ['产品展示', '品牌故事', '活动回顾'];
 const Icon = isPoster ? Image : Clapperboard;
 const update = (key: keyof Brief, value: string) => setBrief(b => ({ ...b, [key]: value }));
 return <div className="media-creation-layout">
  <section className="panel media-brief-panel">
   <div className="panel-heading"><div><PenLine size={18}/><h2>{isPoster ? '海报创作需求' : '视频混剪需求'}</h2></div></div>
   <form className="form-stack" onSubmit={e => { e.preventDefault(); if (!brief.title.trim()) return; setSaved({ ...brief, title: brief.title.trim() }); notify(`${isPoster ? '海报' : '视频'}需求已保留在本次创作中`); }}>
    <label>创作主题 <em>*</em><Input required maxLength={100} value={brief.title} onChange={e => update('title', e.target.value)} placeholder={isPoster ? '例如：让智能出行走进日常' : '例如：新品体验短视频'}/></label>
    <label>内容类型<Select value={brief.purpose} onValueChange={v => v && update('purpose', v)}><SelectTrigger className="picker" aria-label="内容类型"><SelectValue/></SelectTrigger><SelectContent>{options.map(v => <SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectContent></Select></label>
    <label>{isPoster ? '海报比例' : '视频比例'}<Select value={brief.ratio} onValueChange={v => v && update('ratio', v)}><SelectTrigger className="picker" aria-label={isPoster ? '海报比例' : '视频比例'}><SelectValue/></SelectTrigger><SelectContent>{(isPoster ? ['竖版 3:4', '方形 1:1', '横版 16:9'] : ['竖屏 9:16', '横屏 16:9', '方形 1:1']).map(v => <SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectContent></Select></label>
    <label>{isPoster ? '画面与文案要求' : '剪辑与素材要求'}<Textarea className="brief-input" value={brief.requirements} onChange={e => update('requirements', e.target.value)} placeholder={isPoster ? '描述海报风格、主标题和希望突出的信息…' : '描述视频节奏、素材顺序、字幕和配乐要求…'}/></label>
    <div className="reference-summary"><BookOpen size={17}/><div><b>{brand} · 品牌知识</b><p>{knowledgeCount} 条口径与素材可供参考</p></div></div>
    <Button type="submit" className="primary-button generate-button" disabled={!brief.title.trim()}><Check/>保存创作需求</Button>
   </form>
  </section>
  <section className="panel media-workspace-panel">
   <div className="media-workspace-toolbar"><div><Icon size={18}/><h2>{isPoster ? '海报工作区' : '视频工作区'}</h2></div><span className="status-badge">{saved ? '待制作' : '等待创作'}</span></div>
   {saved ? <div className="media-saved-brief"><span className="media-kind-icon"><Icon size={28}/></span><span className="media-kicker">{isPoster ? '海报创作单' : '视频混剪单'}</span><h2>{saved.title}</h2><div className="media-brief-tags"><span><LayoutTemplate size={14}/>{saved.purpose}</span><span><Ratio size={14}/>{saved.ratio}</span></div><div className="media-requirements"><h3>制作要求</h3><p>{saved.requirements || '尚未填写具体要求，可在左侧补充。'}</p></div><div className="media-next-step"><FileText size={17}/><p>创作需求已准备好。{isPoster ? '海报设计' : '视频混剪'}工具接入后，可在此继续制作和预览。</p></div><button className="text-link" onClick={() => { setSaved(null); notify('已返回需求编辑，左侧内容仍保留', 'info'); }}>继续调整需求</button></div> : <div className="media-start-state"><span className="media-kind-icon"><Icon size={36}/></span><h2>{isPoster ? '从一个想法，开始一张海报' : '把精彩片段，剪成一个好故事'}</h2><p>{isPoster ? '确定主题、比例与画面要求，准备品牌海报的创作。' : '明确视频主题、画面比例和剪辑要求，开始整理创作思路。'}</p><div className="media-start-types">{options.map((option, index) => <button key={option} onClick={() => update('purpose', option)} className={brief.purpose === option ? 'selected' : ''}><span>{index === 0 ? <Sparkles size={21}/> : index === 1 ? <LayoutTemplate size={21}/> : <FileText size={21}/>}</span><b>{option}</b></button>)}</div></div>}
   <footer className="media-workspace-footer">{isPoster ? '海报创作' : '视频混剪'}界面预览 · 当前可整理创作需求，制作服务待接入</footer>
  </section>
 </div>;
}

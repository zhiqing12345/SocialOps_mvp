'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import { ArrowRight, CalendarDays, Check, CheckCircle2, ChevronLeft, ChevronRight, Clock3, FileCheck2, FileText, Link2, PenLine, Plus, Settings2, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { platforms, uid, type Model, type Page, type WorkbenchState } from './model';
import { notify } from './workspace';

type Props = { model: Model; setModel: Dispatch<SetStateAction<Model>>; navigate: (page: Page) => void; setPrompt: (value: string) => void };
const emptyWorkbench: WorkbenchState = { targets: {}, tasks: [], completedTaskIds: [] };
const dateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const platformColors = ['green', 'amber', 'rose', 'blue'];

export function HomeWorkbench({ model, setModel, navigate, setPrompt }: Props) {
  const [today] = useState(() => dateKey(new Date()));
  const [month, setMonth] = useState(today.slice(0, 7));
  const [selectedDay, setSelectedDay] = useState(today);
  const [dialog, setDialog] = useState<'targets' | 'task' | 'calendar' | 'drafts' | 'tasks' | null>(null);
  const [targetInput, setTargetInput] = useState<Record<string, number>>({});
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState(today);

  const workbench = model.workbench ?? emptyWorkbench;
  const monthRecords = model.records.filter(record => record.date.startsWith(month));
  const targets = workbench.targets[month] ?? {};
  const totalTarget = platforms.reduce((sum, platform) => sum + (targets[platform] ?? 0), 0);
  const progress = totalTarget ? Math.round(monthRecords.length / totalTarget * 100) : 0;
  const drafts = model.drafts.filter(draft => draft.status === '草稿');
  const finalized = model.drafts.filter(draft => draft.status === '已定稿');
  const unpublished = finalized.filter(draft => !model.records.some(record => record.draftId === draft.id));
  const missingLinks = model.records.filter(record => !record.url);
  const missingMetrics = model.records.filter(record => record.views === null || record.likes === null);
  const updateWorkbench = (update: (state: WorkbenchState) => WorkbenchState) => setModel(current => ({ ...current, workbench: update(current.workbench ?? emptyWorkbench) }));
  const tasks = [
    ...drafts.map(draft => ({ id: `draft-${draft.id}-${draft.updated}`, title: `完善「${draft.title}」`, date: '', page: 'create' as Page, prompt: draft.title })),
    ...(missingLinks.length ? [{ id: `links-${missingLinks.map(record => record.id).sort().join('-')}`, title: `补充 ${missingLinks.length} 条发布链接`, date: '', page: 'records' as Page, prompt: '' }] : []),
    ...(missingMetrics.length ? [{ id: `metrics-${missingMetrics.map(record => record.id).sort().join('-')}`, title: `补充 ${missingMetrics.length} 条内容数据`, date: '', page: 'records' as Page, prompt: '' }] : []),
    ...workbench.tasks.map(task => ({ ...task, page: null, prompt: '' })),
  ].filter(task => !workbench.completedTaskIds.includes(task.id) && (!task.date || task.date <= today));
  const [year, monthNumber] = month.split('-').map(Number);
  const offset = (new Date(year, monthNumber - 1, 1).getDay() + 6) % 7;
  const days = new Date(year, monthNumber, 0).getDate();
  const calendarCells = Array.from({ length: Math.ceil((offset + days) / 7) * 7 }, (_, index) => index >= offset && index < offset + days ? index - offset + 1 : null);
  const changeMonth = (delta: number) => {
    const nextMonth = dateKey(new Date(year, monthNumber - 1 + delta, 1)).slice(0, 7);
    setMonth(nextMonth);
    setSelectedDay(nextMonth === today.slice(0, 7) ? today : `${nextMonth}-01`);
  };
  const selectedRecords = model.records.filter(record => record.date.slice(0, 10) === selectedDay);
  const selectedTasks = workbench.tasks.filter(task => task.date === selectedDay && !workbench.completedTaskIds.includes(task.id));
  const statuses = [
    { label: '草稿', value: drafts.length, icon: PenLine, color: 'violet', action: () => setDialog('drafts') },
    { label: '已定稿', value: finalized.length, icon: FileCheck2, color: 'blue', action: () => navigate('create') },
    { label: '已定稿待发布', value: unpublished.length, icon: Clock3, color: 'amber', action: () => navigate('records') },
    { label: '已发布', value: model.records.length, icon: CheckCircle2, color: 'green', action: () => navigate('records') },
    { label: '待补充链接', value: missingLinks.length, icon: Link2, color: 'blue', action: () => navigate('records') },
    { label: '待补充数据', value: missingMetrics.length, icon: TrendingUp, color: 'rose', action: () => navigate('analytics') },
  ];
  const calendarGrid = <div className="wb-calendar-grid">
    {['一', '二', '三', '四', '五', '六', '日'].map(day => <span className="wb-weekday" key={day}>{day}</span>)}
    {calendarCells.map((day, index) => {
      const date = `${month}-${String(day).padStart(2, '0')}`;
      const count = day ? monthRecords.filter(record => record.date.slice(0, 10) === date).length : 0;
      const taskCount = day ? workbench.tasks.filter(task => task.date === date && !workbench.completedTaskIds.includes(task.id)).length : 0;
      return day ? <button type="button" key={date} className={`wb-day${date === selectedDay ? ' selected' : ''}${date === today ? ' today' : ''}`} aria-label={`${date}，${count} 篇发布，${taskCount} 项待办`} aria-pressed={date === selectedDay} aria-current={date === today ? 'date' : undefined} onClick={() => { setSelectedDay(date); setDialog('calendar'); }}>{day}<span className="wb-day-dots">{count > 0 && <i />}{taskCount > 0 && <i className="task-dot" />}</span></button> : <span key={`empty-${index}`} />;
    })}
  </div>;

  return <div className="home-workbench">
    <div className="page-heading wb-heading"><div><h1>社会化运营总览</h1><p>累计发布 <b>{model.records.length}</b> 篇<span>·</span>本月新增 <b>{model.records.filter(record => record.date.startsWith(today.slice(0, 7))).length}</b> 篇</p></div><div className="wb-heading-actions"><Button className="primary-button" onClick={() => { setPrompt(''); navigate('create'); }}><Plus />开始写稿</Button><Button variant="outline" onClick={() => setDialog('drafts')}><FileText />查看草稿</Button></div></div>

    <section className="panel wb-progress-panel" aria-labelledby="wb-progress-title"><div className="wb-section-top"><h2 id="wb-progress-title">{month === today.slice(0, 7) ? '本月' : `${monthNumber} 月`}内容总达成</h2><div><strong className="wb-progress-value">{totalTarget ? `${progress}%` : '未设目标'}</strong><button className="text-link" onClick={() => { setTargetInput(Object.fromEntries(platforms.map(platform => [platform, targets[platform] ?? 0]))); setDialog('targets'); }}><Settings2 size={14} />设置目标</button></div></div><progress className="wb-progress-track wb-native-progress" aria-label="月度发布目标达成率" max={100} value={Math.min(progress, 100)} aria-valuetext={totalTarget ? `已完成 ${monthRecords.length} 篇，目标 ${totalTarget} 篇，达成率 ${progress}%` : '尚未设置月度目标'}>{progress}%</progress><div className="wb-target-list">{platforms.map((platform, index) => <span key={platform}><i className={`wb-dot ${platformColors[index]}`} />{platform}运营与发布 <b>{monthRecords.filter(record => record.platform === platform).length}<small>/{targets[platform] ?? '—'}</small></b></span>)}<span className="wb-total">合计 <b>{monthRecords.length}<small>/{totalTarget || '—'}</small></b></span></div></section>

    <div className="wb-overview-grid">
      <section className="panel wb-platform-panel"><div className="panel-heading"><h2>{month === today.slice(0, 7) ? '本月各平台' : `${monthNumber} 月各平台`}</h2><span className="wb-caption">已发布 / 篇</span></div><div className="wb-platform-list">{platforms.map((platform, index) => <div key={platform}><span><i className={`wb-dot ${platformColors[index]}`} />{platform}</span><strong>{monthRecords.filter(record => record.platform === platform).length}</strong></div>)}</div></section>
      <section className="panel wb-calendar-panel"><div className="panel-heading"><div className="wb-month-controls"><button aria-label="上个月" onClick={() => changeMonth(-1)}><ChevronLeft size={16} /></button><h2>{year} 年 {monthNumber} 月</h2><button aria-label="下个月" onClick={() => changeMonth(1)}><ChevronRight size={16} /></button></div><button className="text-link" onClick={() => setDialog('calendar')}>完整日历 <ArrowRight size={14} /></button></div>{calendarGrid}<div className="wb-calendar-legend"><span><i className="wb-dot blue" />已发布</span><span><i className="wb-dot amber" />待办安排</span><button className="text-link" onClick={() => { setMonth(today.slice(0, 7)); setSelectedDay(today); }}>今天</button></div></section>
      <section className="panel wb-todo-panel"><div className="panel-heading"><div><Zap size={18} /><h2>今日待办</h2><span className="count-pill">{tasks.length}</span></div><button className="icon-button" aria-label="添加待办" onClick={() => { setTaskDate(today); setDialog('task'); }}><Plus size={18} /></button></div><div className="wb-todo-list">{tasks.slice(0, 5).map(task => <div className="wb-todo-row" key={task.id}><button className="wb-task-check" aria-label={`完成待办：${task.title}`} onClick={() => { updateWorkbench(state => ({ ...state, completedTaskIds: [...state.completedTaskIds, task.id] })); notify('待办已完成'); }}><Check size={12} /></button>{task.page ? <button className="wb-task-title" title={task.title} onClick={() => { if (task.prompt) setPrompt(task.prompt); navigate(task.page!); }}>{task.title}</button> : <span className="wb-task-title" title={task.title}>{task.title}</span>}<small className={task.date && task.date < today ? 'overdue' : ''}>{task.date && task.date < today ? '逾期' : '待办'}</small></div>)}{tasks.length === 0 && <p className="wb-empty"><CheckCircle2 size={22} />今天的待办已处理完毕</p>}</div><div className="wb-todo-footer">{tasks.length > 5 ? <button className="text-link" onClick={() => setDialog('tasks')}>查看全部 {tasks.length} 项待办 <ArrowRight size={13} /></button> : '完成一项，离好内容更近一步'}</div></section>
    </div>

    <section className="wb-status-section" aria-labelledby="wb-status-title"><h2 id="wb-status-title" className="wb-section-label">当前内容状态</h2><div className="wb-status-grid">{statuses.map(status => <button className="panel wb-status-card" key={status.label} onClick={status.action}><span className={`stat-icon ${status.color}`}><status.icon size={20} /></span><span><small>{status.label}</small><strong>{status.value}</strong></span><ChevronRight size={16} /></button>)}</div></section>

    <footer className="page-footer"><span>SocialOps · 让小团队的每一步，都更有底气</span><span>示例项目，所有数据仅用于原型演示</span></footer>

    <Dialog open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}><DialogContent className="large-dialog">
      {dialog === 'targets' && <><DialogTitle>{year} 年 {monthNumber} 月发布目标</DialogTitle><DialogDescription>按平台设置本月计划发布篇数，进度根据发布记录自动更新。</DialogDescription><form className="form-stack" onSubmit={event => { event.preventDefault(); if (platforms.some(platform => !Number.isSafeInteger(targetInput[platform]) || targetInput[platform] < 0)) return; updateWorkbench(state => ({ ...state, targets: { ...state.targets, [month]: targetInput } })); setDialog(null); notify('月度目标已保存'); }}>{platforms.map(platform => <label key={platform} htmlFor={`wb-target-${platform}`}>{platform}<Input id={`wb-target-${platform}`} type="number" min={0} max={100000} step={1} required value={Number.isNaN(targetInput[platform]) ? '' : targetInput[platform] ?? 0} onChange={event => setTargetInput(current => ({ ...current, [platform]: event.target.valueAsNumber }))} /></label>)}<Button type="submit" className="primary-button">保存目标</Button></form></>}
      {dialog === 'task' && <><DialogTitle>添加待办</DialogTitle><DialogDescription>安排一项内容工作，到期后会显示在今日待办中。</DialogDescription><form className="form-stack" onSubmit={event => { event.preventDefault(); if (!taskTitle.trim()) return; updateWorkbench(state => ({ ...state, tasks: [...state.tasks, { id: uid(), title: taskTitle.trim(), date: taskDate }] })); setTaskTitle(''); setDialog(null); notify('待办已添加'); }}><label htmlFor="wb-task-title">待办内容<Input id="wb-task-title" value={taskTitle} onChange={event => setTaskTitle(event.target.value)} maxLength={100} required placeholder="例如：整理本周选题" /></label><label htmlFor="wb-task-date">计划日期<Input id="wb-task-date" type="date" value={taskDate} onChange={event => setTaskDate(event.target.value)} required /></label><Button type="submit" className="primary-button" disabled={!taskTitle.trim()}>添加待办</Button></form></>}
      {dialog === 'calendar' && <><DialogTitle>内容日历</DialogTitle><DialogDescription>查看已登记的发布记录与计划待办。</DialogDescription><div className="wb-section-top"><button className="text-link" onClick={() => changeMonth(-1)}><ChevronLeft size={16} />上个月</button><b>{year} 年 {monthNumber} 月</b><button className="text-link" onClick={() => changeMonth(1)}>下个月<ChevronRight size={16} /></button></div>{calendarGrid}<div className="wb-calendar-detail"><h3><CalendarDays size={16} />{selectedDay}</h3>{selectedRecords.map(record => <button key={record.id} onClick={() => { setDialog(null); navigate('records'); }}><span>{record.title}</span><small>{record.platform} · 已发布</small></button>)}{selectedTasks.map(task => <p key={task.id}>{task.title}<small>待办</small></p>)}{selectedRecords.length === 0 && selectedTasks.length === 0 && <p className="wb-caption">当天暂无发布记录或待办安排</p>}<button className="text-link" onClick={() => { setTaskDate(selectedDay); setDialog('task'); }}><Plus size={14} />添加当日待办</button></div></>}
      {dialog === 'tasks' && <><DialogTitle>全部待办</DialogTitle><DialogDescription>处理今天需要关注的内容工作，完成后会从待办列表中移除。</DialogDescription><div className="wb-all-tasks">{tasks.map(task => <div className="wb-todo-row" key={task.id}><button className="wb-task-check" aria-label={`完成待办：${task.title}`} onClick={() => { updateWorkbench(state => ({ ...state, completedTaskIds: [...state.completedTaskIds, task.id] })); notify('待办已完成'); }}><Check size={12} /></button><span className="wb-task-title" title={task.title}>{task.title}</span><small>{task.date || '待处理'}</small></div>)}{tasks.length === 0 && <p className="wb-caption">所有待办已处理完毕</p>}</div></>}
      {dialog === 'drafts' && <><DialogTitle>待完善的文案</DialogTitle><DialogDescription>进入内容创作中心后，可在草稿列表中继续编辑和确认定稿。</DialogDescription><div className="wb-draft-list">{drafts.map(draft => <button key={draft.id} onClick={() => { setPrompt(draft.title); setDialog(null); navigate('create'); }}><span><b>{draft.title}</b><small>{draft.platform} · {draft.updated}</small></span><ChevronRight size={16} /></button>)}{drafts.length === 0 && <p className="wb-caption">暂无草稿，开始写下一个好想法吧。</p>}</div><Button className="primary-button" onClick={() => { setPrompt(''); setDialog(null); navigate('create'); }}><Plus />开始写稿</Button></>}
    </DialogContent></Dialog>
  </div>;
}

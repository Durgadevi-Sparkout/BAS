'use client'

import { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { Calendar as DatePicker } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import EventFormDialog from './event-form'

const formatLocalDateTime = (date) => {
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const formatDayHeader = (date) => {
    const d = new Date(date)
    return `${d.getDate()} ${d.toLocaleDateString('en-US', { weekday: 'long' })}`
}

const formatMonthYear = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}

export default function CalendarPage({ mode = 'hourly' }) {
    const calendarRef = useRef(null)
    const [events, setEvents] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedRange, setSelectedRange] = useState({ start: '', end: '' })
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [editingEvent, setEditingEvent] = useState(null);

    const handleDateSelect = (selectInfo) => {
        setSelectedRange({
            start: formatLocalDateTime(selectInfo.start),
            end: formatLocalDateTime(selectInfo.end),
        })
        setDialogOpen(true)
    }

    const handleAddEvent = (eventData) => {
        // setEvents((prev) => [
        //     ...prev,
        //     {
        //         title: eventData.title,
        //         start: eventData.start,
        //         end: eventData.end,
        //         description: eventData.description,
        //         className: eventData.variant,
        //     },
        // ])
        // setDialogOpen(false)
        // setSelectedRange({ start: '', end: '' })


        if (editingEvent) {
            setEvents((prev) =>
                prev.map((evt) =>
                    evt.id === editingEvent.id
                        ? {
                              ...evt,
                              title: eventData.title,
                              start: eventData.start,
                              end: eventData.end,
                              description: eventData.description,
                              className: eventData.variant,
                          }
                        : evt
                )
            )
        } else {
            setEvents((prev) => [
                ...prev,
                {
                    id: String(Date.now()),
                    title: eventData.title,
                    start: eventData.start,
                    end: eventData.end,
                    description: eventData.description,
                    className: eventData.variant,
                },
            ])
        }
    
        setDialogOpen(false)
        setSelectedRange({ start: '', end: '' })
        setEditingEvent(null)
    }

    const handleDatePickerSelect = (date) => {
        setSelectedDate(date)
        const calendarApi = calendarRef.current?.getApi()
        if (calendarApi) {
            calendarApi.gotoDate(date)
        }
    }

    const isHourly = mode === 'hourly'
    const initialView = isHourly ? 'timeGridDay' : 'dayGridMonth'

    const handleEventClick = (clickInfo) => {
        debugger;
        const event = clickInfo.event
        setEditingEvent({
            id: event.id,
            title: event.title,
            start: formatLocalDateTime(event.start),
            end: formatLocalDateTime(event.end),
            description: event.extendedProps.description || '',
            variant: event.classNames[0] || '',
        })
        setDialogOpen(true)
    }

    return (
        <main className="min-h-screen bg-background text-foreground p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-4 items-center">
                        <Button onClick={() => calendarRef.current?.getApi().today()} size="sm">Today</Button>
                        <Button onClick={() => calendarRef.current?.getApi().prev()} size="sm">←</Button>
                        <Button onClick={() => calendarRef.current?.getApi().next()} size="sm">→</Button>

                        {/* {isHourly && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">View</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => calendarRef.current?.getApi().changeView('dayGridMonth')}>Month</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => calendarRef.current?.getApi().changeView('timeGridWeek')}>Week</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => calendarRef.current?.getApi().changeView('timeGridDay')}>Day</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => calendarRef.current?.getApi().changeView('listWeek')}>List</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )} */}

                        <EventFormDialog
                            open={dialogOpen}
                            onOpenChange={(open) => {
                                if (!open) setEditingEvent(null)
                                setDialogOpen(open)
                            }}
                            onAddEvent={handleAddEvent}
                            defaultStart={selectedRange.start || editingEvent?.start}
                            defaultEnd={selectedRange.end || editingEvent?.end}
                            defaultTitle={editingEvent?.title || ''}
                            defaultDescription={editingEvent?.description || ''}
                            defaultVariant={editingEvent?.variant || ''}
                        />
                    </div>

                    {isHourly && (
                        <div className="text-xl font-semibold mb-2">
                            {formatDayHeader(selectedDate)}
                        </div>
                    )}

                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                        initialView={initialView}
                        initialDate={selectedDate}
                        headerToolbar={false}
                        nowIndicator={false}
                        editable={true}
                        selectable={true}
                        select={handleDateSelect}
                        events={events}
                        eventClick={handleEventClick}
                        height="auto"
                        allDaySlot={!isHourly}
                        slotMinTime={isHourly ? '09:00:00' : "00:00:00"}
                        slotMaxTime={isHourly ? '20:00:00' : "00:00:00"}
                        slotDuration={isHourly ? '00:45:00' : "00:00:00"}
                        dayHeaderContent={(arg) => {
                            const date = new Date(arg.date)
                            const day = date.getDate()
                            const weekday = date.toLocaleString('default', { weekday: 'long' })
                            const month = date.toLocaleString('default', { month: 'long' })
                            const year = date.getFullYear()
                            return `${day} ${weekday}, ${month} ${year}`
                        }}
                        dayCellClassNames={() => 'bg-white'}
                        slotLaneClassNames={() => 'bg-gray-100'}
                        slotLabelClassNames={() => 'text-gray-600 font-medium'}
                        contentHeight="auto"
                        eventOverlap={false}
                    />
                </div>

                {isHourly && (
                    <div className="w-full md:w-1/4 bg-muted p-4 rounded-xl shadow">
                        <h4 className="font-semibold mb-2">{formatMonthYear(selectedDate)}</h4>
                        <DatePicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDatePickerSelect}
                            className="rounded-md border"
                        />
                        <p className="text-muted-foreground italic mt-4">
                        <h5 className="font-semibold mb-2">Bookings on {selectedDate.toDateString()}:</h5>

                            {
                                events.length === 0 && (
                                    <p className="text-muted-foreground italic"> No Bookings scheduled </p>
                                )
                            }
                            {
                                events.length > 0 && events.filter((event) => {
                                    const eventDate = new Date(event.start);
                                    return eventDate.toDateString() === selectedDate.toDateString();
                                })?.map((event, index) => (
                                    <div className="mt-4">
                                        <ul className="space-y-1 text-sm">
                                            <li key={index} className="bg-white p-2 rounded shadow-sm border">
                                                <div className="font-medium">{event.title}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                                {event.description && (
                                                    <div className="text-xs text-gray-600">{event.description}</div>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                ))
                            }
                        </p>
                    </div>
                )}
            </div>
        </main>
    )
}

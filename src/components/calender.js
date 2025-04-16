'use client'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import EventFormDialog from './event-form'

const formatLocalDateTime = (date) => {
    const d = new Date(date)
    console.log(d)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  
export default function Calendar() {
    const [events, setEvents] = useState([])

    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedRange, setSelectedRange] = useState({ start: '', end: '' })

    
    const handleDateSelect = (selectInfo) => {
        setSelectedRange({
          start: formatLocalDateTime(selectInfo.start),
          end: formatLocalDateTime(selectInfo.end),
        })
      
        setDialogOpen(true)
      }
      
    const handleAddEvent = (eventData) => {
        setEvents([
            ...events,
            {
                title: eventData.title,
                start: eventData.start,
                end: eventData.end,
                description: eventData.description,
                className: eventData.variant,
            },
        ])
        setDialogOpen(false)
        setSelectedRange({ start: '', end: '' })
    }

    return (
        <main className="min-h-screen  text-black">
            <div className="container mx-auto py-10">
                <div className="flex justify-end mb-4">
                    <EventFormDialog
                        open={dialogOpen}
                        onOpenChange={setDialogOpen}
                        onAddEvent={handleAddEvent}
                        defaultStart={selectedRange.start}
                        defaultEnd={selectedRange.end}
                    />
                </div>
                <div className="p-4 bg-background text-foreground">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                        }}
                        initialView="timeGridWeek"
                        nowIndicator={true}
                        editable={true}
                        selectable={true}
                        select={handleDateSelect}
                        events={events}
                        height="auto"
                    />
                </div>
            </div>
        </main>

    )
}

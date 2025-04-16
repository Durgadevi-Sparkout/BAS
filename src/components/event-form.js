'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

export default function EventFormDialog({ open, onOpenChange, onAddEvent, defaultStart, defaultEnd }) {
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    variant: 'blue',
    description: '',
  })

  useEffect(() => {
    if (open) {
      setFormData((prev) => ({
        ...prev,
        start: defaultStart || '',
        end: defaultEnd || '',
      }))
    }
  }, [open, defaultStart, defaultEnd])

  console.log(formData, "formData")

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.start || !formData.end) return
    onAddEvent(formData)
    setFormData({ title: '', start: '', end: '', variant: 'blue', description: '' })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <p className="text-sm text-muted-foreground">Create a new event for your calendar.</p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label>Title</Label>
            <Input
              placeholder="Enter a title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
          <div>
            <Label>Start Date</Label>
            <Input
              type="datetime-local"
              value={formData.start}
              onChange={(e) => handleChange('start', e.target.value)}
            />
          </div>
          <div>
            <Label>End Date</Label>
            <Input
              type="datetime-local"
              value={formData.end}
              onChange={(e) => handleChange('end', e.target.value)}
            />
          </div>
          <div>
            <Label>Variant</Label>
            <Select
              value={formData.variant}
              onValueChange={(val) => handleChange('variant', val)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">🔵 Blue</SelectItem>
                <SelectItem value="red">🔴 Red</SelectItem>
                <SelectItem value="green">🟢 Green</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Enter a description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

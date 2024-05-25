import { defineStore } from 'pinia'
import type { eventWithTime } from '@rrweb/types'

interface EventState {
    events: eventWithTime[]
}
export const useEventStore = defineStore('eventStore', {
    state: (): EventState => ({
        events: []
    }),
    getters: {},
    actions: {
        setEvents(events: eventWithTime[]) {
            this.events = events
        },
        getEvents() {
            return this.events
        }
    }
}) as any

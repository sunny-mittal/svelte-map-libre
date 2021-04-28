import Queue from "fastq";
import type { queue } from "fastq";

export class EventQueue {
  queue: queue;
  constructor(worker) {
    this.queue = Queue(this, worker, 1);
    this.queue.pause();
  }

  send(command: string, params: any[] = []) {
    if (!command) return;
    this.queue.push([command, params]);
  }

  start() {
    this.queue.resume();
  }

  stop() {
    this.queue.kill();
  }
}

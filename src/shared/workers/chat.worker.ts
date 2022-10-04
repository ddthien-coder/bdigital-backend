import { config } from '@root/config';
import { chatService } from '@service/db/chat.service';
import { DoneCallback, Job } from 'bull';
import Logger from 'bunyan';

const log: Logger = config.createLogger('chatWorker');

class ChatWorker {

  async addChatMessageToDB(jobQueue: Job, done: DoneCallback): Promise<void> {
    try {
      await chatService.addMessageToDB(jobQueue.data);
      jobQueue.progress(100);
      done(null, jobQueue.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

}

export const chatWorker: ChatWorker = new ChatWorker();

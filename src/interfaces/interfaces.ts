//import { Socket } from 'socket.io';

declare module 'redis' {
    export interface RedisClient extends NodeJS.EventEmitter {
      setAsync(...args: any[]): Promise<any>;
      getAsync(...args: any[]): Promise<any>;
    }
}

export interface Dummy {
    dummyProp: string;
}
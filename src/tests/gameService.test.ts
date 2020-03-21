import { initGame, join } from '../services/gameService';
import { Socket } from 'socket.io';

describe('GameService Test', () => {
    it('creates a game', async () => {
      expect.assertions(1);
      const socketMock = {
          handshake: {
              session: {
                  userId: "randomuserid"
              }
          }
      };
      
      const result: any = await initGame(socketMock as unknown as Socket);
      return expect(result).not.toBeNull();
    });

    it('can create a game and join', async () => {
        expect.assertions(1);
        const socketMock = {
            handshake: {
                session: {
                    userId: "randomuserid"
                }
            }
        };

        const socketMock2 = {
            handshake: {
                session: {
                    userId: "randomuserid2"
                }
            }
        };
  
        const result: any = await initGame(socketMock as unknown as Socket);
        const joinResult: any = await join(result.gameId, socketMock2 as unknown as Socket, true)
        return expect(joinResult).not.toBeNull();
      });

      it('can not join a game twice', async () => {
        expect.assertions(1);
        const socketMock = {
            handshake: {
                session: {
                    userId: "randomuserid3"
                }
            }
        };
    
        const game: any = await initGame(socketMock as unknown as Socket);
        return expect(join(game.gameId, socketMock as unknown as Socket, true)).rejects.toEqual(new Error('USER_ALREADY_CONNECTED'))
      });
  
    
  })
  

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
  
        const result: any = await initGame(socketMock as unknown as Socket);
        const joinResult: any = await join(result.gameId, 'randomuserid2', true)
        return expect(joinResult).not.toBeNull();
      });

      //ONLY LEFT AS EXAMPLE FOR EXCEPTION TESTING. TEST NO LONGER RELEVANT BECAUSE OF RECONNECT FUNCTIONALITY

      /*it('can not join a game twice', async () => {
        const socketMock = {
            handshake: {
                session: {
                    userId: "randomuserid3"
                }
            }
        };
    
        const game: any = await initGame(socketMock as unknown as Socket);
        return expect(join(game.gameId, 'randomuserid3', true)).rejects.toEqual(new Error('USER_ALREADY_CONNECTED'))*/
      });
  
    
  })
  

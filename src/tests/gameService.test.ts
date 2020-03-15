import { initGame, join } from '../services/gameService';

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

      const result: any = await initGame(socketMock);
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
  
        const result: any = await initGame(socketMock);
        const joinResult: any = await join(result.gameId, socketMock2)
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
    
        const game: any = await initGame(socketMock);
        return expect(join(game.gameId, socketMock)).rejects.toEqual(new Error('USER_ALREADY_CONNECTED'))
      });
  
    
  })
  

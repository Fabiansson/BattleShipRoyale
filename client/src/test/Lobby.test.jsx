import React from 'react';

import Lobby from '../components/Lobby';
import renderer from 'react-test-renderer';


describe('Lobby', () => {
    it('renders correctly', () => {
        const generalGameStateMock = {
            gameId: 'adasdad',
            admin: 'Peter',
            players: [{
                playerId: 'asdasda',
                playerName: 'afffff'
            }]
        }

        const component = renderer.create(<Lobby generalGameState={generalGameStateMock}/>)

        expect(component).toMatchSnapshot();
    });
});
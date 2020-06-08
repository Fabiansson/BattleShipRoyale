import React from 'react';
import EnzymeToJson from 'enzyme-to-json';
import TwoDBattleground from '../components/TwoDBattleground';
import { SnackbarProvider } from 'notistack';
import {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme';

configure({adapter: new Adapter()});
describe('Battleground', () => {
    it('renders correctly', () => {
        const terrainMock = [0,1,0,0,0,0,0,0,0];
        const loopMapMock = [1];
        const fogMock = {
            radius: 2,
            xCenter: 0,
            yCenter: 0,
            nextRadius: 1,
            nextXCenter: 0,
            nextYCenter: 0
        }
        const shipsMock = [{
            shotsOrMoves: 3,
            position: [{
                health: 1,
                x: 2,
                y:2
            }
            ]
        }]
        const hitsMock = [];
        const inventoryMock = [];

        const component = mount(<SnackbarProvider maxSnack={3}>
            <TwoDBattleground terrain={terrainMock} lootMap={loopMapMock} fog={fogMock} ships={shipsMock} hits={hitsMock} inventory={inventoryMock} />
            </SnackbarProvider>)
        expect(EnzymeToJson(component)).toMatchSnapshot();
    });
});
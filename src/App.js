import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import Page from './Page';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';


class App extends Component {
  constructor(props) {
    super(props);
    // We'll first check if ther's any palette in the local storage first, if there's nothing, then we'll load seedColors, as in, palettes: seedColors
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = { palettes: savedPalettes || seedColors };
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  deletePalette(id) {
    //filtering out palettes and then adding the new list of palettes (after deletion of a particular palette) 
    //to the local storage by calling 'syncLocalStorage' (and this func is called once the setState is done)
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }), this.syncLocalStorage
    )
  }

  savePalette(newPalette) {
    //saving the new palette to the existing palette list and the a callback func 'syncLocalStorage' which is called after the newPalette is added to the existing palette's list
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage);
  }

  //A func to add the newPalette to the local storage to sync with the local storage
  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
  }

  render() {
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={500}>
            < Switch location={location}>
              {/* In this case order matters. '/new' might be replaced with '/:id' if this route is put after '/palette/:id', so in order to avoid this problem, this route is kept above '/:id' */}
              < Route
                exact
                path='/palette/new'
                render={(routeProps) => (
                  <Page>
                    <NewPaletteForm
                      savePalette={this.savePalette}
                      palettes={this.state.palettes}
                      {...routeProps}
                    />
                  </Page>
                )} />
              {/* We use '(routeProps)' & '{...routeProps}' whenever we want to redirect to a diff route. */}
              <Route
                exact
                path='/'
                render={(routeProps) => (
                  <Page>
                    <PaletteList
                      palettes={this.state.palettes}
                      deletePalette={this.deletePalette}
                      {...routeProps}
                    />
                  </Page>
                )} />
              <Route
                exact
                path='/palette/:id'
                render={(routeProps) => (
                  <Page>
                    <Palette palette={generatePalette(
                      //We find the palette using the 'id' from the url and then pass it in the 'generatePalette' func to generate the desired palette
                      this.findPalette(routeProps.match.params.id))}
                    />
                  </Page>
                )} />
              <Route
                exact
                path='/palette/:paletteId/:colorId'
                render={(routeProps) => (
                  <Page>
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId))}
                    />
                  </Page>
                )} />
              {/* This below route acts as an 'else' statement, that is, in case a wrong route is entered, then the app will not break, rather it will take us to the PAletteList page, i.e, the home page */}
              <Route
                render={(routeProps) => (
                  <Page>
                    <PaletteList
                      palettes={this.state.palettes}
                      deletePalette={this.deletePalette}
                      {...routeProps}
                    />
                  </Page>
                )} />
            </Switch >
          </CSSTransition>
        </TransitionGroup>
      )} />
    )
  }
}

export default App;

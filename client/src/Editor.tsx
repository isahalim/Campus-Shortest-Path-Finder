import React, { Component, MouseEvent } from 'react';
import { Building } from './types';


// NOTE: you may change types of props, if desired! These are only reccomendations.
// You shouldn't need more props than these, but you can add others, if desired.
type EditorProps = {
  /** Names of all the buildings that are available to choose. */
  buildings: Array<Building>;

  /** Names of all the buildings that are available to choose. */
  savedPaths: Array<[Building, Building]>;

  /** Called to note that the selection has changed. */
  onEndPointChange: (endPoints?: [Building, Building]) => void;

  /** Called to save the path currently displayed on the map. */
  onSavePathClick: (endPoints: [string, string]) => void;
};

type EditorState = {
  // TODO (task 1): decide on the state to store
  startName: string;
  endName: string;
  pathName: string;
};


/** Component that allows user to select buildings to find path between and save paths. */
export class Editor extends Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props);

    this.state = {
      startName: "",
      endName: "",
      pathName: "",
    };
  }

  // HINT: componentDidUpdate may be useful in task 5!
  componentDidUpdate = (prevProps: Readonly<EditorProps>, _prevState: Readonly<EditorState>): void =>  {
    if (this.props.savedPaths !== prevProps.savedPaths) {
      // maybe in this case hint hint
    }
  }

  render = (): JSX.Element => {
    // TODO (task 1): fill this in
    return <div>
        <label htmlFor="from">From: </label>
        <select
          id="from"
          value = {this.state.startName}
          onChange={this.doHandleStartChange}>
          {this.renderBuildings()}
        </select>

        <label htmlFor="to">To: </label>
        <select
          id="to"
          value={this.state.endName}
          onChange={this.doHandleEndChange}>
          {this.renderBuildings()}
        </select>

        <div>
          <select
          id="savedPath"
          value={this.state.pathName}
          onChange={this.doHandlePathChange}>
          {this.renderSavedPaths()}
        </select>
        </div>

        <div>
          <button onClick={this.doSavePathClick}>Save</button>
          <button onClick={this.doClearClick}>Clear</button>
        </div>
    </div>

  };

  // TODO (task 1): add render helper functions and event handlers as needed.
  //   ALL fetch requests should go in App.tsx! Use callbacks if you're
  //   tempted to add one here.
    renderBuildings = (): Array<JSX.Element> => {
      const elems: Array<JSX.Element> = [];
      elems.push(<option value={""} key={""}>(choose a building)</option>);
      // Loop through each color and create a dropdown option for each
      for (const b of this.props.buildings) {
        elems.push(<option value={b.shortName} key={b.shortName}>{b.longName}</option>);
      }
      return elems;
    };

    doFindBuildingOnChange = (shortName: string): Building | undefined => {
      for (const b of this.props.buildings) {
        if (b.shortName === shortName) {
          return b;
        }
      }
      return undefined;
    };

    renderSavedPaths = (): Array<JSX.Element> => {
      const elems: Array<JSX.Element> = [];
      elems.push(<option value={""} key={""}>(fill with saved path)</option>);
      // Loop through each color and create a dropdown option for each
      for (const p of this.props.savedPaths) {
        const start = p[0];
        const end = p[1];
        elems.push(<option 
          value={start.shortName + "|" + end.shortName}
          key={start.shortName + "," + end.shortName}>{start.longName + " to " + end.longName}</option>);
      }
      return elems;
    };

    doHandleStartChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      this.setState({
        startName: e.target.value,
      });
      const startBuilding = this.doFindBuildingOnChange(e.target.value);
      const endBuilding = this.doFindBuildingOnChange(this.state.endName);
      if (startBuilding !== undefined && endBuilding !== undefined) {
        this.props.onEndPointChange([startBuilding, endBuilding]);
      }
    };

    doHandleEndChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      this.setState({
        endName: e.target.value,
      });
      const startBuilding = this.doFindBuildingOnChange(this.state.startName);
      const endBuilding = this.doFindBuildingOnChange(e.target.value);
      if (startBuilding !== undefined && endBuilding !== undefined) {
        this.props.onEndPointChange([startBuilding, endBuilding]);
      }
    };
    
    doHandlePathChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const [startName, endName] = e.target.value.split("|");
      this.setState({
        pathName: e.target.value,
        startName: startName,
        endName: endName,
      });
      const startBuilding = this.doFindBuildingOnChange(startName);
      const endBuilding = this.doFindBuildingOnChange(endName);
      if (startBuilding !== undefined && endBuilding !== undefined) {
        this.props.onEndPointChange([startBuilding, endBuilding]);
      }
    };

    doSavePathClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
      if (this.state.startName !== "" && this.state.endName !== "") {
        this.props.onSavePathClick([this.state.startName, this.state.endName]);
      }
    }
  
    doClearClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
      this.setState({
        startName: "",
        endName: "",
        pathName: "",
      })
      this.props.onEndPointChange(undefined);
    };
}
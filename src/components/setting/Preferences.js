import { useContext, useEffect } from "react";

import VideoPlayerContext from "../context/VideoPlayerContext";

import PerferencesCheckBox from "./PerferencesCheckBox";

const Preferences = () => {
    const context = useContext(VideoPlayerContext);
    useEffect(() => {
        context.actions.setTempSkipPreferences(JSON.parse(JSON.stringify(context.skipPreferences)));
    }, [])

    useEffect(() => {
        console.log(context.tempSkipPreferences);
    }, [context.tempSkipPreferences])



    return (
        <section className="preferencesContainer container">
            <h2>skip content</h2>
            <table className="preferencesTable">
                <colgroup>
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Specific Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Material</td>
                        <td>
                            {Object.entries(context.tempSkipPreferences).map((key) => {
                                if (key[1][1] === 0)
                                    return (
                                        <PerferencesCheckBox
                                            option={key[0]}
                                            key={key[0]}
                                            checked={context.tempSkipPreferences[key[0]][0]}
                                            onClick={() => {
                                                context.actions.setTempSkipPreferences(prev => {
                                                    const next = { ...prev };
                                                    next[key[0]][0] = !next[key[0]][0];
                                                    return next;
                                                })
                                            }}
                                        />
                                    );
                                else
                                    return null;
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td>Sensation</td>
                        <td>
                            {Object.entries(context.tempSkipPreferences).map((key) => {
                                if (key[1][1] === 1)
                                    return (
                                        <PerferencesCheckBox
                                            option={key[0]}
                                            key={key[0]}
                                            checked={context.tempSkipPreferences[key[0]][0]}
                                            onClick={() => {
                                                context.actions.setTempSkipPreferences(prev => {
                                                    const next = { ...prev };
                                                    next[key[0]][0] = !next[key[0]][0];
                                                    return next;
                                                })
                                            }}
                                        />
                                    );
                                else
                                    return null;
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td>Else</td>
                        <td>
                            {Object.entries(context.tempSkipPreferences).map((key) => {
                                if (key[1][1] === 2)
                                    return (
                                        <PerferencesCheckBox
                                            option={key[0]}
                                            key={key[0]}
                                            checked={context.tempSkipPreferences[key[0]][0]}
                                            onClick={() => {
                                                context.actions.setTempSkipPreferences(prev => {
                                                    const next = { ...prev };
                                                    next[key[0]][0] = !next[key[0]][0];
                                                    return next;
                                                })
                                            }}
                                        />
                                    );
                                else
                                    return null;
                            })}
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" className="preferencesButton" onClick={context.actions.saveSkipPreferences}>save skip preferences</button>
            <span className="preferencesMessage">Preferences saved!</span>
        </section>
    );
}

export default Preferences;
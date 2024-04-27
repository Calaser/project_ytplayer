import { useContext, useEffect } from "react";

import VideoPlayerContext from "../context/VideoPlayerContext";

import PerferencesCheckBox from "./PerferencesCheckBox";

const Preferences = () => {
    const context = useContext(VideoPlayerContext);
    useEffect(() => {
        context.actions.setTempSkipPreferences(JSON.parse(JSON.stringify(context.skipPreferences)));
        // eslint-disable-next-line
    }, [context.skipPreferences])

    // useEffect(() => {
    //     console.log(context.tempSkipPreferences);
    // }, [context.tempSkipPreferences])



    return (
        <section className="preferencesContainer container">
            <h2>{context.translateData["setting"]["skip content"][context.currentLanguage]}</h2>
            <p className="perferenceDesc">{context.translateData["setting"]["skip content2"][context.currentLanguage]}</p>
            <table className="preferencesTable">
                <colgroup>
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th>{context.translateData["setting"]["skip content3"][context.currentLanguage]}</th>
                        <th>{context.translateData["setting"]["skip content4"][context.currentLanguage]}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{context.translateData["setting"]["skip content5"][context.currentLanguage]}</td>
                        <td>
                            {Object.entries(context.tempSkipPreferences).map((key) => {
                                if (key[1][1] === 0)
                                    return (
                                        <PerferencesCheckBox
                                            option={key[0]}
                                            key={key[0]}
                                            checked={context.tempSkipPreferences[key[0]][0]}
                                            name={context.translateData["setting"][key[0]][context.currentLanguage]}
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
                        <td>{context.translateData["setting"]["skip content6"][context.currentLanguage]}</td>
                        <td>
                            {Object.entries(context.tempSkipPreferences).map((key) => {
                                if (key[1][1] === 1)
                                    return (
                                        <PerferencesCheckBox
                                            option={key[0]}
                                            key={key[0]}
                                            checked={context.tempSkipPreferences[key[0]][0]}
                                            name={context.translateData["setting"][key[0]][context.currentLanguage]}
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
                        <td>{context.translateData["setting"]["skip content7"][context.currentLanguage]}</td>
                        <td>
                            {Object.entries(context.tempSkipPreferences).map((key) => {
                                if (key[1][1] === 2)
                                    return (
                                        <PerferencesCheckBox
                                            option={key[0]}
                                            key={key[0]}
                                            checked={context.tempSkipPreferences[key[0]][0]}
                                            name={context.translateData["setting"][key[0]][context.currentLanguage]}
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
            <button type="button" className="preferencesButton" onClick={context.actions.saveSkipPreferences}>{context.translateData["setting"]["skip content8"][context.currentLanguage]}</button>
            <span className="preferencesMessage">{context.translateData["setting"]["skip content9"][context.currentLanguage]}</span>
        </section>
    );
}

export default Preferences;
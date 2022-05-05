import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorBoxStyles';

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => {
                this.setState({ copied: false })
            }, 1500);
        });
    }
    render() {
        const { name, background, moreUrl, showingFullPalette, classes } = this.props;
        const { copied } = this.state;
        // Luminance Property -> Taking 0.08 as threshold to decide the luminocity of the text color. 'isDarkColor' returns true or false.
        // const isDarkColor = chroma(background).luminance() <= 0.08;
        // const isLightColor = chroma(background).luminance() >= 0.7;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className={classes.ColorBox}>
                    <div
                        style={{ background }}
                        //We wanna show 'copyOverlay' always, and , only show 'showOverlay' when 'copied' is 'true'
                        className={clsx(classes.copyOverlay, {
                            [classes.showOverlay]: copied
                        })}
                    />
                    <div className={clsx(classes.copyMsg, {
                        [classes.showMessage]: copied
                    })}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {/* 'stopPropagation' will prevent further events from being propagated or from being called down/up the line */}
                    {showingFullPalette && (
                        < Link to={moreUrl} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>MORE</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard >
        );
    }
}
export default withStyles(styles)(ColorBox);

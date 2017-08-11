import React, { Component } from 'react';
import GameClock from './GameClock';
import Themes from './helpers/themes';
import LabelBox from './LabelBox';
import ScoreBox from './ScoreBox';
import PeriodIndicators from './PeriodIndicators';

class Scoreboard extends Component {
  render() {
    let { theme, home_score, time, total_periods, cur_period, visitor_score} = this.props;
    theme = theme === undefined ? Themes['dark'] : Themes[theme];
    return (
      <section className={"react-scoreboard " + theme}>
        <div className="flex-row">
          <div className="col-score">
            <LabelBox label="Home" theme={theme}></LabelBox>
            <ScoreBox score={home_score} theme={theme}></ScoreBox>
          </div>
          <div className="col-center">
            <GameClock time={time} theme={theme}></GameClock>
            <LabelBox label="Period" type="period" theme={theme}></LabelBox>
            <PeriodIndicators total_periods={total_periods} cur_period={cur_period}></PeriodIndicators>
          </div>
          <div className="col-score">
            <LabelBox label="Away" theme={theme}></LabelBox>
            <ScoreBox score={visitor_score} theme={theme}></ScoreBox>
          </div>
        </div>
      </section>
    );
  }
}

export default Scoreboard;
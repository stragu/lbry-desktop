// @flow
import React, { PureComponent } from 'react';
import posed from 'react-pose';
import Button from 'component/button';
import EmailCollection from 'component/emailCollection';
import Native from 'native';

//
// Animation for items inside banner
// The height for items must be static (in banner.scss) so that we can reliably animate into the banner and be vertically centered
//
const spring = {
  type: 'spring',
  stiffness: 100,
  damping: 10,
  mass: 1,
};

const Welcome = posed.div({
  hide: { opacity: 0, y: '310px', ...spring },
  show: { opacity: 1, ...spring },
});

const Email = posed.div({
  hide: { opacity: 0, y: '0', ...spring },
  show: { opacity: 1, y: '-310px', ...spring, delay: 175 },
});

const Help = posed.div({
  hide: { opacity: 0, y: '0', ...spring },
  show: { opacity: 1, y: '-620px', ...spring, delay: 175 },
});

type Props = {
  welcomeAcknowledged: boolean,
  emailCollectionAcknowledged: boolean,
  firstRunComplete: boolean,
  acknowledgeWelcome: () => void,
  completeFirstRun: () => void,
};

export default class FirstRun extends PureComponent<Props> {
  render() {
    const {
      welcomeAcknowledged,
      emailCollectionAcknowledged,
      firstRunComplete,
      acknowledgeWelcome,
      completeFirstRun,
    } = this.props;

    if (firstRunComplete) {
      return null;
    }

    const showWelcome = !welcomeAcknowledged;
    const showEmail = !emailCollectionAcknowledged && welcomeAcknowledged;
    const showHelp = !showWelcome && !showEmail;

    return (
      <div className="banner banner--first-run">
        <img
          alt="Friendly gerbil"
          className="yrbl--first-run banner__item"
          src={Native.imagePath('gerbil-happy.png')}
        />

        <div className="banner__item">
          <div className="banner__item--static-for-animation">
            <Welcome className="banner__content" pose={showWelcome ? 'show' : 'hide'}>
              <div>
                <header className="card__header">
                  <h1 className="card__title">{__('Hi There')}</h1>
                </header>
                <div className="card__content">
                  <p>
                    {__('Using LBRY is like dating a centaur. Totally normal up top, and')}{' '}
                    <em>{__('way different')}</em> {__('underneath.')}
                  </p>
                  <p>{__('Up top, LBRY is similar to popular media sites.')}</p>
                  <p>
                    {__(
                      'Below, LBRY is controlled by users -- you -- via blockchain and decentralization.'
                    )}
                  </p>
                  <div className="card__actions">
                    <Button button="primary" onClick={acknowledgeWelcome} label={__("I'm In")} />
                  </div>
                </div>
              </div>
            </Welcome>
          </div>
          <div className="banner__item--static-for-animation">
            <Email pose={showEmail ? 'show' : 'hide'}>
              <EmailCollection />
            </Email>
          </div>
          <div className="banner__item--static-for-animation">
            <Help pose={showHelp ? 'show' : 'hide'}>
              <header className="card__header">
                <h1 className="card__title">{__('You Are Awesome!')}</h1>
              </header>
              <div className="card__content">
                <p>{__("Check out some of the neat files below me. I'll see you around!")}</p>
                <div className="card__actions">
                  <Button button="primary" onClick={completeFirstRun} label={__('See You Later')} />
                </div>
              </div>
            </Help>
          </div>
        </div>
      </div>
    );
  }
}

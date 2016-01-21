import React from 'react';
import Helper from './helper';
import Store from './store';
import { Link } from 'react-router';

export default class AccountListItem extends React.Component {
    
    openTab() {
        Store.updateLastAccessed(this.props.id);
        Helper.openWindow(this.props.url, this.props.username, this.props.password, false, true);   
    }
    
    openWindow() {
        Store.updateLastAccessed(this.props.id);
        Helper.openWindow(this.props.url, this.props.username, this.props.password);   
    }
    
    openIncognito() {
        Store.updateLastAccessed(this.props.id);
        const result = Helper.openWindow(this.props.url, this.props.username, this.props.password, true);
        console.log(this.props.onError);
        if (!result) {
            this.props.onError(
                <div>
                    <h2>This extension needs to be enabled in incognito mode in order for this to work</h2>
                    <p>Click <a onClick={ Helper.gotoExtensionUrl } href="#">here</a> to do that.</p>
                </div>
            );
        }   
    }
    
    deleteRecord() {
        Store.deleteAccount(this.props.id);
    }
    
	render() {
		return (
			<tr>
				<td className="slds-lookup__item">
                    <a id="s01" href="#" role="option" onClick={ this.openTab.bind(this) }>
                        <svg aria-hidden="true" className="slds-icon slds-icon-standard-account slds-icon--small">
                            <use xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#account"></use>
                        </svg><span>{this.props.name}</span>&nbsp;
                    </a>
			    </td>
			    <td>
                    <Link to={`/add/${this.props.id}`}>
                        <button className="slds-button slds-button--neutral slds-button--small">
                            <svg aria-hidden="true" className="slds-button__icon--stateful">
                                <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#edit"></use>
                            </svg>
                        </button>
                    </Link>
                    <button className="slds-button slds-button--destructive slds-button--small slight-margin-left" onClick={ this.deleteRecord.bind(this) }>
                        <svg aria-hidden="true" className="slds-button__icon--stateful">
                            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#delete"></use>
                        </svg>
                    </button>
			        <button className="slds-button slds-button--brand slds-button--small" onClick={ this.openTab.bind(this) }>Tab</button>
                    <button className="slds-button slds-button--brand slds-button--small" onClick={ this.openWindow.bind(this) }>Window</button>
                    <button className="slds-button slds-button--brand slds-button--small" onClick={ this.openIncognito.bind(this) }>Incognito</button>
				</td>
			</tr>
		);
	}
}
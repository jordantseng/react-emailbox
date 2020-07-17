import React, { Component } from 'react';

import emailService from '../../apis/email';
import InboxReply from '../InboxReply/InboxReply';
import Loader from '../Shared/Loader/Loader';
import '../InboxShow/InboxShow.css';

class InboxShow extends Component {
  state = {
    email: {
      subject: '',
      from: '',
      to: '',
      text: '',
      html: '',
    },
  };
  isLoading = true;

  async componentDidMount() {
    this.fetchEmail();
  }

  async componentDidUpdate(prevProps) {
    this.isLoading = true;
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchEmail();
    }
  }

  async fetchEmail() {
    const { data } = await emailService.get(
      `/emails/${this.props.match.params.id}`
    );
    const { subject, from, to, html, text } = data;
    this.isLoading = false;
    this.setState({ email: { subject, from, to, html, text } });
  }

  render() {
    const { email } = this.state;

    if (this.isLoading) {
      return <Loader />;
    }
    return (
      <div>
        <div className="header">
          <div>
            <h3>{email.subject}</h3>
            <div>
              From: <i>{email.from}</i>
            </div>
            <div>
              To: <i>{email.to}</i>
            </div>
          </div>
          <div>
            <InboxReply user={this.props.user} email={email} />
          </div>
        </div>
        <div className="ui divider content"></div>
        <div dangerouslySetInnerHTML={{ __html: email.html }}></div>
      </div>
    );
  }
}

export default InboxShow;

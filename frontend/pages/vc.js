import RecordRTC, { CanvasRecorder } from 'recordrtc';
import io from 'socket.io-client';

const Button = dynamic(() => import('elementz/lib/Components/Button'), {
  ssr: false
});

export default class Vc {
  componentDidMount() {
    this.socket = io();
    CanvasRecorder;
  }
  async onClick() {
    const recorder = RecordRTC(
      await navigator.mediaDevices.getUserMedia({ audio: true }),
      { type: 'audio', MimeType: 'audio/wav' }
    );
  }
  render() {
    return <Button onClick={() => this.onClick()}>Click Me To Start VC</Button>;
  }
}

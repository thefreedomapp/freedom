import RecordRTC from 'recordrtc';
import io from 'socket.io-client';
import ss from 'socket.io-stream';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('elementz/lib/Components/Button'), {
  ssr: false
});

export default class Vc {
  componentDidMount() {
    this.socket = io();
  }

  async onClick() {
    const recorder = RecordRTC(
      await navigator.mediaDevices.getUserMedia({ audio: true }),
      { type: 'audio', MimeType: 'audio/wav' }
    );

    await recorder.startRecording();

    ss(this.socket).emit();
  }
  render() {
    return <Button onClick={() => this.onClick()}>Click Me To Start VC</Button>;
  }
}

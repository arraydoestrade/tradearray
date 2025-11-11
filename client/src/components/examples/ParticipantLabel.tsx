import { ParticipantLabel } from '../ParticipantLabel';

export default function ParticipantLabelExample() {
  return (
    <div className="flex flex-col gap-4 p-8 bg-gradient-to-br from-blue-900 to-purple-900">
      <ParticipantLabel name="Marc Isaac" isMuted={false} />
      <ParticipantLabel name="Ana García" isMuted={true} />
      <ParticipantLabel name="Carlos Ruiz" isMuted={false} />
    </div>
  );
}

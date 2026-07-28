import json
from datetime import datetime

def main():
    user_speech_onset = 0.320
    user_speech_end = 0.930
    first_caption_time = 1.333
    first_tts_audio = 2.347

    ttfc_from_onset = first_caption_time - user_speech_onset
    ttfs_from_onset = first_tts_audio - user_speech_onset
    ttfc_from_end = first_caption_time - user_speech_end
    ttfs_from_end = first_tts_audio - user_speech_end

    print('=' * 60)
    print('  EXBABEL SPEED TEST - LATENCY ANALYSIS REPORT')
    print('=' * 60)
    print()
    print('  Video: exbabel speed test.mp4')
    print(f'  Analyzed: {datetime.now().isoformat()}')
    print(f'  Precision: +/-33ms (30fps frame analysis)')
    print()
    print('-' * 60)
    print('  TIMELINE')
    print('-' * 60)
    events = [
        (0.000, 'Video starts', 'Screen shows Waiting for speech...'),
        (user_speech_onset, 'USER SPEECH ONSET', 'Audio rises above noise floor'),
        (user_speech_end, 'User speech ends', 'Silence period begins'),
        (first_caption_time, 'FIRST CAPTION VISIBLE', 'Hola| appears on screen'),
        (first_tts_audio, 'FIRST TRANSLATED AUDIO', 'TTS audio output begins'),
    ]
    for t, name, detail in events:
        marker = '>>>' if name.startswith(('USER','FIRST')) else '   '
        print(f'  {marker} {t:6.3f}s  {name}')
        print(f'              {detail}')
    print()
    print('-' * 60)
    print('  RESULTS: From Speech Onset')
    print('-' * 60)
    print(f'  TTFC (Time to First Caption):  {ttfc_from_onset:.3f}s')
    print(f'  TTFS (Time to First Speech):   {ttfs_from_onset:.3f}s')
    print()
    print('-' * 60)
    print('  RESULTS: From End of Utterance (processing time only)')
    print('-' * 60)
    print(f'  TTFC (Time to First Caption):  {ttfc_from_end:.3f}s')
    print(f'  TTFS (Time to First Speech):   {ttfs_from_end:.3f}s')
    print()
    print('=' * 60)

    report = {
        'test_name': 'Exbabel Real-Time Translation Speed Test',
        'video_file': 'exbabel speed test.mp4',
        'analysis_date': datetime.now().isoformat(),
        'methodology': {
            'video_analysis': 'Frame-by-frame extraction at 30fps using ffmpeg',
            'audio_analysis': 'RMS level per ~21ms frame using ffmpeg astats filter',
            'precision': '+/-33ms (1 frame at 30fps)',
        },
        'results': {
            'from_speech_onset': {
                'TTFC_seconds': round(ttfc_from_onset, 3),
                'TTFS_seconds': round(ttfs_from_onset, 3),
            },
            'from_utterance_end': {
                'TTFC_seconds': round(ttfc_from_end, 3),
                'TTFS_seconds': round(ttfs_from_end, 3),
            },
        },
    }
    with open('/home/jkang1643/projects/exbabel/scripts/speed_test_results.json', 'w') as f:
        json.dump(report, f, indent=2)
    print(f'  JSON report saved to: scripts/speed_test_results.json')

if __name__ == '__main__':
    main()

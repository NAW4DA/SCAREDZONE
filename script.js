document.addEventListener('DOMContentLoaded', function() {
    let currentMember = null;
    const audioPlayer = document.getElementById('audio-player');
    let nawadaTrack = './assests/21savage.mp3'; 
    
    const memberInfoData = {
        'NAW4DA': { 'name': 'NAWADA', 'image': './assests/NAWADA.png', 'description': 'tattooed in reverse' },
    };
    
    function showMember(member) {
        const info = memberInfoData[member];
        if (!info) return;
        const memberDiv = document.getElementById('member-info');
        const selectedElement = document.querySelector(`[onclick="showMember('${member}')"]`);
        if (currentMember) {
            currentMember.classList.remove('selected');
            const previousDot = document.getElementById(`${currentMember.getAttribute('data-member')}-dot`);
            if (previousDot) previousDot.innerHTML = '::';
        }
        if (currentMember === selectedElement) {
            currentMember = null;
            memberDiv.innerHTML = '';
            resetMusic();
            return;
        }
        if (selectedElement) {
            selectedElement.classList.add('selected');
            selectedElement.setAttribute('data-member', member);
        } else {
            return;
        }
        document.querySelectorAll('.yellow').forEach(dot => {
            dot.innerHTML = '::';
        });
        const currentDot = document.getElementById(`${member}-dot`);
        if (currentDot) {
            currentDot.innerHTML = '<span style="color: #8a0000; margin-top: -2px;">&bull;</span>';
        }
        memberDiv.innerHTML = `
            <img src="${info.image}" class="fade-in" style="height: 120px;" draggable="false">
            <p style="margin-top: 5px; margin-bottom: 0; color: #b90000;">[ ${info.name} ]</p>
            <hr style="border-top: 1px solid #b90000; margin: 3px 0;">
            <p class="glitch" style="margin-top: 5px;">${info.description}</p>
        `;
        currentMember = selectedElement;
        playNawadaMusic();
    }

    function playNawadaMusic() {
        if (audioPlayer.src !== nawadaTrack) {
            audioPlayer.src = nawadaTrack;
            audioPlayer.play();
        }
    }

    function resetMusic() {
        if (audioPlayer.src !== './assests/NAWADAMENU.mp3') {
            audioPlayer.src = './assests/NAWADAMENU.mp3';
            audioPlayer.play();
        }
    }

    function removeOverlay() {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
        resetMusic();
    }

    window.removeOverlay = removeOverlay;
    window.showMember = showMember;

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            resetMusic(); 
        }
    });
});

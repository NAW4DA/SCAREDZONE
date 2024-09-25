document.addEventListener('DOMContentLoaded', function() {
    let currentMember = null;
    const audioPlayer = document.getElementById('audio-player');
    const donateInfo = document.getElementById('donation-info');

    const memberInfoData = {
        'NAW4DA': { 
            'name': 'NAWADA', 
            'image': './assets/NAWADA.png', 
            'description': 'tattooed in reverse | <span style="color: red;">atori ❤</span>', 
            'track': './assets/NAWADA.mp3' 
        },
        'HADARI': { 
            'name': 'HADARI', 
            'image': './assets/hadari.png', 
            'description': 'TYPESCRIPT/JAVASCRIPT, KALI LINUX KILLER.', 
            'track': './assets/HADARI.mp3' 
        },
        'DFGEAK': { 
            'name': 'DFGEAK', 
            'image': './assets/DANILO.png', 
            'description': 'PYTHON KILLER. FAME.', 
            'track': './assets/DFGEAK.mp3'
        },
        'KATANTIKA': {
            'name': 'ATORI', 
            'image': './assets/meow.png', 
            'description': 'DESIGN KILLER! <span style="color: red;">nawada lox ❤</span>', 
            'track': './assets/meow.mp3'
        }
    };    

    function showMember(member) {
        const info = memberInfoData[member];
        const memberDiv = document.getElementById('member-info');
        const selectedElement = document.querySelector(`[onclick="showMember('${member}')"]`);

        if (!info) return;

        if (currentMember) {
            currentMember.classList.remove('selected');
            resetDot(currentMember.getAttribute('data-member'));
        }

        if (currentMember === selectedElement) {
            currentMember = null;
            memberDiv.innerHTML = '';
            resetMusic();
            donateInfo.style.display = 'block';
            return;
        }

        if (selectedElement) {
            selectedElement.classList.add('selected');
            selectedElement.setAttribute('data-member', member);
            currentMember = selectedElement;
        } else {
            return;
        }

        updateDots(member);
        
        memberDiv.innerHTML = `
            <img src="${info.image}" class="fade-in" style="height: 120px;" draggable="false">
            <p style="margin-top: 5px; margin-bottom: 0; color: #b90000;">[ ${info.name} ]</p>
            <hr style="border-top: 1px solid #b90000; margin: 3px 0;">
            <p class="glitch" style="margin-top: 5px;">${info.description}</p>
        `;
        
        playMemberMusic(info.track);
        donateInfo.style.display = 'none';
    }

    function playMemberMusic(track) {
        if (audioPlayer.src !== track) {
            audioPlayer.src = track;
            audioPlayer.play();
        }
    }

    function resetMusic() {
        const defaultTrack = './assets/NAWADAMENU.mp3';
        if (audioPlayer.src !== defaultTrack) {
            audioPlayer.src = defaultTrack;
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

    function resetDot(memberId) {
        const previousDot = document.getElementById(`${memberId}-dot`);
        if (previousDot) previousDot.innerHTML = '::';
    }

    function updateDots(member) {
        document.querySelectorAll('.yellow').forEach(dot => {
            dot.innerHTML = '::';
        });
        const currentDot = document.getElementById(`${member}-dot`);
        if (currentDot) {
            currentDot.innerHTML = '<span style="color: #8a0000; margin-top: -2px;">&bull;</span>';
        }
    }

    window.removeOverlay = removeOverlay;
    window.showMember = showMember;
});

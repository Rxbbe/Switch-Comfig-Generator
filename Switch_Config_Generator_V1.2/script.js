function generatePreview() {
  const interfaceType = document.getElementById('interface-type').value.trim();
  const ports = document.getElementById('ports').value.trim().split('\n').map(port => port.trim());
  const accessVlan = document.getElementById('access-vlan').value.trim();
  const voiceVlan = document.getElementById('voice-vlan').value.trim();
  const networkType = document.getElementById('network-type').value.trim();

  // Generate configurations based on input values
  let preview = '';

  ports.forEach(port => {
    preview += `configure terminal\n`;
    preview += `interface ${interfaceType} ${port}\n`;
    preview += `switchport access vlan ${accessVlan}\n`;

    if (networkType === 'enable-phone'){
      preview += `switchport voice vlan ${voiceVlan}\n`;
    } else if  (networkType === 'disable-phone'){
      preview += 'no switchport voice vlan\n';
    }

    if (networkType === 'enable') {
      preview += `no shutdown\n`; // Enable interface
    } else if (networkType === 'disable' || networkType === 'disable-phone') {
      preview += `shutdown\n`; // Disable interface
    } else if (networkType === 'enable-phone') {
      preview += `no shutdown\n`; // Shutdown if phone network is enabled
    }

    preview += `end\n\n`;
  });

  // Update the preview display
  document.getElementById('preview').textContent = preview;
}

// Attach event listeners to input fields to trigger preview generation
document.getElementById('interface-type').addEventListener('change', generatePreview);
document.getElementById('ports').addEventListener('input', generatePreview);
document.getElementById('access-vlan').addEventListener('input', generatePreview);
document.getElementById('voice-vlan').addEventListener('input', generatePreview);
document.getElementById('network-type').addEventListener('change', generatePreview);

// Generate initial preview on page load
generatePreview();

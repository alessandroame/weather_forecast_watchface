
AppSettingsPage({
    // 1. Define state
    state: {
        testKey: null
    },
    build(props) { 
        this.getStorage(props)
         console.log('AppSettingsPage build')
        // 3. Logic
        const toggleButtonMap = {
        ['Hello Zepp OS']: 'Hello World',
        ['Hello World']: 'Hello Zepp OS'
        }

        // 4. Return Render Function
        return Button({
        label: this.state.testKey,
        style: {
            fontSize: '12px',
            borderRadius: '30px',
            background: '#D85E33',
            color: 'white'
        },
        onClick: () => {
            console.log('AppSettingsPage onClick')
            // 5. Modify the data in settingsStorage in the callback function of the event
            props.settingsStorage.setItem('testKey', toggleButtonMap[this.state.testKey])
        }
        })
    }, 
    getStorage(props) {
        this.state.testKey = props.settingsStorage.getItem('testKey') || 'Hello World'
    }
})
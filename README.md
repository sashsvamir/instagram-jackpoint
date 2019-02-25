# instagram-jackpoint

![instagram-jackpoint](https://user-images.githubusercontent.com/1404421/50159633-36688b00-02e8-11e9-880e-4d03387e7738.png)


## Installation

```sh
git clone https://github.com/sashsvamir/instagram-jackpoint.git
yarn install
```


## Setup

* To set user list, edit `js` file `src/users.js`. To shuffle users list, see `shuffle` function.

* To change animation params, change values in `constructor` method of `Slider` class at `src/slider.js`:
```js
	this.durationLoop = 4000
    this.durationStop = 2500
```



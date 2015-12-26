# Contributing [![Stories in Ready][waffle-image]][waffle-url]

- [Forking and branching](#forking-and-branching)
- [Issues](#issues)
- [Contributors](#contributors)

## Forking and branching
Fork the project then create a neew branch to work on using [git flow](http://nvie.com/posts/a-successful-git-branching-model).

### Git flow
For a quick guide to using git flow, see [my blog post](http://furzeface.com/blog/git-flow-aint-scary) on the subject.

Use this for feature branching, with a short feature description or the [GitHub issue number](https://github.com/furzeface/blackledge/issues) as a branch name eg:
```sh
git flow feature start 39
```

```sh
git flow feature start header
```

Push to your fork
```sh
git push --set-upstream origin feature/MY-FEATURE
```

Then submit a [Pull Request](https://github.com/furzeface/blackledge/compare) for review and merging by a project owner.

## Issues [![Stories in Ready][waffle-image]][waffle-url]
Check out the issues in _Ready_ on the [Waffle board](https://waffle.io/furzeface/blackledge) and work away! 

### TODO
Extra tasks in the [Todo list](TODO.md).

## Contributors
See [contributors.md](contributors.md).

To update the list of contributors in `package.json` and [`contributors.md`](contributors.md):
```sh
npm i contributor -g
cd blackledge
contributor
```


[waffle-url]: https://waffle.io/furzeface/blackledge
[waffle-image]: https://badge.waffle.io/furzeface/blackledge.png?label=ready&title=Ready

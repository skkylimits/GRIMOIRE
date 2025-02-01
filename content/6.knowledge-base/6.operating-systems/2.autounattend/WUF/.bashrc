# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# if not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# see bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# if set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# if this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# colored GCC warnings and errors
# export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

# generate art
: << 'COMMENT'
http://patorjk.com/software/taag/#p=display&h=0&v=0&f=Cosmike&t=extra
COMMENT

#################################################################
#
#                   ▄▄▄▄    ▄▄▄        ██████  ██░ ██ 
#               ▓█████▄ ▒████▄    ▒██    ▒ ▓██░ ██▒
#               ▒██▒ ▄██▒██  ▀█▄  ░ ▓██▄   ▒██▀▀██░                  
#                ▒██░█▀  ░██▄▄▄▄██   ▒   ██▒░▓█ ░██ 
#                ░▓█  ▀█▓ ▓█   ▓██▒▒██████▒▒░▓█▒░██▓
#                ░▒▓███▀▒ ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░ ▒ ░░▒░▒
#                ▒░▒   ░   ▒   ▒▒ ░░ ░▒  ░ ░ ▒ ░▒░ ░
#                ░    ░   ░   ▒   ░  ░  ░   ░  ░░ ░
#                ░            ░  ░      ░   ░  ░  ░
#                    ░                            

##################################################################

##################################################################
#                            THE SHELL                           #
##################################################################

###############################################
#                WELCOMES YOU                 #
###############################################
echo "بسم الله الرحمن الرحيم
اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلاَّ بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاو ;َاتِ وَالأَرْضَ وَلاَ يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ "

###############################################
#                    LEGEND                   #
###############################################
: '
\d – Current date
\t – Current time
\h – Host name
\# – Command number
\u – User name
\W – Current working directory (i.e: Desktop/)
\w – Current working directory, full path (i.e: /Users/Admin/Desktop)
'

###############################################
#               COSTUMIZED PROMPT             #
###############################################
PS1="";
PS1+=" ❤️ "; 
PS1+="\[$(tput setab 196)\]\[$(tput setaf 0)\] \w \[$(tput sgr0)\]\[$(tput setaf 255)\] >> ";
PS1+="\[$(tput sgr0)\]"; # Reset the colors so they do not overflow into the whole terminal ;(
export PS1;

################################################################################################################################ 
################################################################################################################################ 

###############################################
#                 SYSTEM INFO                 #
###############################################
function sysinfo() {
   cat << 'COMMENT'

whoami         Displays current username.
id             Returns users identity
hostname       Sets or prints the name of current host system.
uname          Prints basic information about the operating system name and system hardware.
pwd            Returns working directory name.
ifconfig       The ifconfig utility is used to assign or to view an address to a network interface and/or configure network interface parameters.
ip             Ip is a utility to show or manipulate routing, network devices, interfaces and tunnels.
netstat        Shows network status.
ss             Another utility to investigate sockets.
ps             Shows process status.
who            Displays who is logged in.
env            Prints environment or sets and executes command.
lsblk          Lists block devices.
lsusb          Lists USB devices
lsof           Lists opened files.
lspci          Lists PCI devices.

COMMENT
}

################################################################################################################################ 
################################################################################################################################ 

###############################################
#                   HISTORY                   #
###############################################

# don't put duplicate lines or lines starting with space in the history.
# see bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash
HISTSIZE=10000
HISTFILESIZE=10000
HISTCONTROL=ignoredups

################################################################################################################################ 
################################################################################################################################ 

###############################################
#                 FUNCTIONS                   #
###############################################

# summons the matrix for 5 seconds and kills it
function chasetherabbit() {
    clear &&
    cmatrix -C red &&
    printf '\e[3J'  # hacky that also prevents user from scrolling up
}

# bashrc
function bashrc() {
    code ~/.bashrc
}

# memory
function dush() {
    sudo du -h -x -s -- * | sort -r -h | head -20;
     echo 'sudo du -h -x -s -- * | sort -r -h | head -20;'
}

################################################################################################################################ 
################################################################################################################################ 

###############################################
#              MAIN INSTALLABLES              #
###############################################
: '
jq
git
nvm
docker
'

###############################################
#               MISC INSTALLABLES             #
###############################################
: '
cmatrix
'

###############################################
#             SECURITY INSTALLABLES           #
###############################################
: '
net-tools
nmap
'

################################################################################################################################ 
################################################################################################################################ 

###############################################
#                    NVM                      #
###############################################
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

################################################################################################################################ 
################################################################################################################################ 

###############################################
#                   EXTRA                     #
###############################################

### HOW COMPUTERS READ BINARY
: '
How machines read binary? - Transistors and Binary.


The short answer is: Transistors.

Imagine a gate that lets water flow through. Now instead of H20 particles, think of a different type of particles, in this case: electrons. When electrons flow you can say the current is ON, which is a 1, and when the current is cut off, it is an OFF, which is a 0.

Transistors basically require a bit of current to open and close a gate, using some physics principles. They create a bridge that lets current pass through when current passes over the transistor switch, and when the current disappears, the flow is stopped.

The main advantage is that transistors are very, very small, and they can be controlled very precisely and fast, because they use electrical current to control electrical current.

That means it can keep track of many strings of zero’s and one’s. That’s basically what information is, in its simplest and most rudimentary and cost effective way to implement. Information is meaningful structure about other things.

For us, humans, the computer needs only two states (the minimum possible) to represent information. Because it only has two states, computers are cheaper to make and build, because transistors are relatively simple.

Look at your hand. Your hand is a system with 10 individual “bits” of information, which are your fingers. Let’s say if you pull up one finger, that is a one, and if you pull down the same finger that is a zero.

I can transmit to you what fingers I have raised right now.

First I need to create the meaning, let’s say my left pinkie finger is represented by the most significant (left-most) binary digit, and my right most pinkie finger is represented by the least significant (right-most) binary digit.

Then, I will like to transmit you this message:

0000110000

If you managed to decode the message, I say to you:

Good job! You understood binary.
'